const _ = require('lodash');
const Promise = require('bluebird');
const BaseController = require('../base-controller');
const Domain = require('../../../../domain');
const pipeline = require('../../../../libs/pipeline');
const QueryHelper = require('../../../../infra/utils/query-helper');

module.exports = class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.UserService);
  }

  download() {
    let result = QueryHelper.parseUrl(this._ctx.req.url);
    return this._service.download(result.query, result.options);
  }
}