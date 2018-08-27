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

  getToday() {
    let query = {
      createdAt: {
        $lte: new Date()
      },
      isCoooked: {
        $ne: true
      }      
    };

    return this.find(query);
  }

  cook(ids) {
    let doMarkCooked = (id) => {
      return this.updateById(id, {
        isCoooked: true
      })
    }

    return Promise.each(ids, doMarkCooked);
  }

  uncook(ids) {
    let doMarkUncooked = (id) => {
      return this.updateById(id, {
        isCoooked: false
      })
    }

    return Promise.each(ids, doMarkUncooked);
  }
}