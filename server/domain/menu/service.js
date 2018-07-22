const fs = require('fs');
const _ = require('lodash');
const Promise = require('bluebird');
const pipeline = require('../../libs/pipeline');
const schema = require('./schema');
const BaseService = require('../base-service');
const aws = require('aws-sdk');

module.exports = class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  updateById(id, data) {
    if (!id) throw new Error('Missing id');
    if (!data) throw new Error('Missing data');

    let doUploadImage = () => {
      if (!data.image || data.image.indexOf("http") === 0) return;

      return new Promise((resolve, reject) => {
        let type = data.image.split(');')[0].split('/')[1].toLowerCase()
        let base64Data = new Buffer(data.image.replace(/^data:image\/\w+;base64,/, ""), 'base64')
        let params = {
          Bucket: process.env.S3_BUCKET,
          Key: `menu/${id}.${type}`,
          Body: base64Data,
          ACL: 'public-read',
          ContentEncoding: 'base64',
          ContentType: `image/${type}`
        }

        aws.config.update({ 
          accessKeyId: process.env.S3_ACCESS_KEY, 
          secretAccessKey: process.env.S3_SECRET_KEY 
        })

        new aws.S3().upload(params, (err, result) => {
          if (err) throw new Error('Uploaded to S3 failed');
          data.image = result.Location;
          resolve();
        });
      });
    }

    let doUpdate = () => {
      let subs = _.filter(data.subs, item => {
        return item._id && !item.isDeleted
      })

      return super.updateById(id, data)
    }

    return pipeline([
      doUploadImage,
      doUpdate
    ]);   
  } 
}