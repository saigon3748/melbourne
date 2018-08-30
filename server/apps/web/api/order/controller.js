const _ = require('lodash');
const Promise = require('bluebird');
const BaseController = require('../base-controller');
const Domain = require('../../../../domain');
const pipeline = require('../../../../libs/pipeline');

module.exports = class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.OrderService);
  }
  
  getToday() {
    return this._service.getToday();
  }

  markArchived() {
    return this._service.markArchived(this._ctx.req.params.id);
  }  
}