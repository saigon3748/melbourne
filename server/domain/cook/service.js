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
      isCooked: false,
      createdAt: {
        $lte: new Date()
      }
    };

    return this.find(query);
  }

  completeAll() {
    return this.update({}, { isCooked: true });
  }

  complete(id) {
    return this.updateById(id, { isCooked: true });
  }

  undo(id) {
    return this.updateById(id, { isCooked: false });
  }
}