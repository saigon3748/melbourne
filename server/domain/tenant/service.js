const _ = require('lodash');
const Boom = require('boom');
const schema = require('./schema');
const BaseService = require('../base-service');
const User = require('../user');
const pipeline = require('../../libs/pipeline');

module.exports = class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx, false);
  }

  create(data) {
    if (!data) throw new Error('Missing data');
    let tenant;

    let doCheckDuplicateTenant = () => {
      return this.findOne({code: data.tenant.code.toUpperCase()})
        .then(result => {
          if (result) throw Boom.badRequest('Tenant code is not available');
        })
    }

    let doCheckDuplicateAdmin = () => {
      return new User.Service(this._ctx).findOne({username: data.user.username.toLowerCase()})
        .then(result => {
          if (result) throw Boom.badRequest(' Username is not available');
        })
    }

    let doCreateTenant = () => {
      return super.create(data.tenant)
        .then(result => {
          tenant = result;
        })
    }

    let doCreateAdmin = () => {
      if (!tenant) throw Boom.badImplementation('Missing tenant');
      data.user.isAdmin = true;
      data.user.tenant = _.pick(tenant, ['_id', 'name', 'code']);
      return new User.Service(this._ctx).create(data.user);
    }

    let doReturn = () => {
      return tenant;
    }

    return pipeline([
      doCheckDuplicateTenant,
      doCheckDuplicateAdmin,
      doCreateTenant,
      doCreateAdmin,
      doReturn
    ])
  }
}