const _ = require('lodash');
const Promise = require('bluebird');
const pipeline = require('../../libs/pipeline');
const schema = require('./schema');
const BaseService = require('../base-service');

module.exports = class Service extends BaseService {
  constructor(ctx) {
    super(schema, ctx);
  }

  create(data) {
    if (!data) throw new Error('Missing data');
    data.displayIndex = data.displayIndex || 1;

    return super.create(data);
  }

  updateById(id, data) {
    if (!id) throw new Error('Missing id');
    if (!data) throw new Error('Missing data');

    let doUpdateSubs = () => {
      if (!data.name) return;
      
      let query = {
        'parent._id': id
      };

      let update = {
        'parent.name': data.name
      };

      return super.update(query, update);
    }

    let doUpdate = () => {
      return super.updateById(id, data) ;     
    }

    return pipeline([
      doUpdateSubs,
      doUpdate
    ]);
  }
}