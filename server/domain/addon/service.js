const _ = require('lodash');
const moment = require('moment');
const Promise = require('bluebird');
const promiseRetry = require('promise-retry');
const schema = require('./schema');
const BaseService = require('../base-service');
const pipeline = require('../../libs/pipeline');

module.exports = class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  find() {
    return new Promise((resolve, reject) => {
      resolve([
        { _id: '5aa4e913841ad9252b16f0a5', name: 'extra chicken', unitPrice: 3 }, 
        { _id: '5aa4e913841ad9252b16f0a6', name: 'sanagaki soldier', unitPrice: 5 }, 
        { _id: '5aa4e913841ad9252b16f0a7', name: 'extra miles', unitPrice: 2 }
      ]);
    })
  }
}