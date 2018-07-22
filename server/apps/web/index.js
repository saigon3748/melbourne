require('dotenv').config()
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const api = require('./api');
const Bootstrap = require('../../infra/bootstrap');

new Bootstrap().start();

let server = express()
  .use(cors())
  .use(helmet())
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json({
    limit: '5mb',
    verify: (req, res, buf, encoding) => {
      req.rawBody = buf;
    }
  }))
  .use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
  .use(express.static(path.join(__dirname, 'public'), { maxAge: null }))
  .use('/api', api)

server.listen(process.env.WEB_PORT, () => {
  console.log('Server is listening to at port ' + process.env.WEB_PORT);
});
