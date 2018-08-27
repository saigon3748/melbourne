const _ = require('lodash');
const Promise = require('bluebird');
const BaseController = require('../base-controller');
const Domain = require('../../../../domain');
const pipeline = require('../../../../libs/pipeline');

module.exports = class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.CookService);
  }

  getToday() {
    return this._service.getToday();
  }

  cook() {
    return this._service.cook(this._ctx.req.body);    
  }

  uncook() {
    return this._service.uncook(this._ctx.req.body);    
  }
}