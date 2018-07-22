const _ = require('lodash');
const Promise = require('bluebird');
const BaseController = require('../base-controller');
const Domain = require('../../../../domain');
const pipeline = require('../../../../libs/pipeline');

module.exports = class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.KitchenService);
  }

  getToday() {
    return this._service.getToday();
  }

  markCompleted() {
    return this._service.markCompleted(this._ctx.req.body);    
  }

  markUncompleted() {
    return this._service.markUncompleted(this._ctx.req.body);    
  }
}