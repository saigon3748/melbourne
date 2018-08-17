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
        { _id: '5aa4e913841ad9252b16f0a5', amount: 5 }, 
        { _id: '5aa4e913841ad9252b16f0a6', amount: 10 }, 
        { _id: '5aa4e913841ad9252b16f0a7', amount: 20 }, 
        { _id: '5aa4e913841ad9252b16f0a8', amount: 50 }, 
        { _id: '5aa4e913841ad9252b16f0a9', amount: 100 }, 
        { _id: '5aa4e913841ad9252b16f0a0', amount: 200 }, 
        { _id: '5aa4e913841ad9252b16f0a1', amount: 500 }
      ]);
    })
  }
}