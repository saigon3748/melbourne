const _ = require('lodash');
const schema = require('./schema');
const BaseService = require('../base-service');
const pipeline = require('../../libs/pipeline');

module.exports = class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  updateById(id, data) {
    if (!id) throw new Error('Missing id');
    if (!data) throw new Error('Missing data');

    let doUpdate = () => {
      return super.updateById(id, _.omit(data, ['password']));
    }

    let doUpdatePassword = () => {
      if (!data.password) return;

      return this.findById(id)
        .then(user => {
          if (!user) return;
          if (user.password === data.password) return;
          user.password = data.password;
          return user.save();
        })
    }

    return pipeline([
        doUpdate,
        doUpdatePassword
      ])
  } 
}