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
      isCompleted: {
        $ne: true
      }      
    };

    return this.find(query);
  }

  markCompleted(ids) {
    let doMarkItemCompleted = (id) => {
      return this.updateById(id, {
        isCompleted: true
      })
    }

    return Promise.each(ids, doMarkItemCompleted);
  }

  markUncompleted(ids) {
    let doMarkItemUncompleted = (id) => {
      return this.updateById(id, {
        isCompleted: false
      })
    }

    return Promise.each(ids, doMarkItemUncompleted);
  }
}