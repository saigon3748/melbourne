const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mkdirp = require('mkdirp');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

let uploadMenu = function (req, res, next) {
  multer({
    limits: {
      fileSize: 5242880 //5mb
    },
    storage: multerS3({
      s3: new aws.S3({ Bucket: process.env.S3_BUCKET }),
      bucket: process.env.S3_BUCKET,
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, {
          ContentType: "image/jpeg"
        })
      },
      key: (req, file, cb) => {
        let timestamp = new Date().getTime();
        cb(null, `menu/${timestamp}${path.extname(file.originalname)}`)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
        return cb(new Error('File upload only supports the following filetypes : (jpg, jpeg, png)'));
      }

      cb(null, true);
    }
  })
  .single('file')(req, res, err => {
    if (err) throw err;
    if (req.file && req.file.location) {
      req.body.imageUrl = req.file.location;
    }
    next();
  })
}

module.exports = {
  uploadMenu
}