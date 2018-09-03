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

  completeAll() {
    return this._service.completeAll();
  }

  complete() {
    return this._service.complete(this._ctx.req.params.id);
  }

  undo() {
    return this._service.undo(this._ctx.req.params.id);
  }
}