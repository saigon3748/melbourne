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
}