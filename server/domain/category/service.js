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
    let category;

    let doCreate = () => {
      return super.create({
        name: data.name,
        displayIndex: data.displayIndex || 1
      }).then(result => {
        category = result;
      })
    }

    let doCreateSubs = () => {
      let doCreateSub = (sub) => {
        return super.create({
          parent: category._id,
          name: sub.name,
          displayIndex: sub.displayIndex || 1
        }).then(result => {
          sub._id = result._id;
        })        
      }

      return Promise.all(_.map(data.subs, sub => doCreateSub(sub)))
    }

    let doUpdate = () => {
      return super.updateById(category._id, {
        subs: data.subs
      })
    }

    let doReturn = () => {
      return category;
    }

    return pipeline([
      doCreate,
      doCreateSubs,
      doUpdate,
      doReturn
    ]);
  }

  updateById(id, data) {
    if (!id) throw new Error('Missing id');
    if (!data) throw new Error('Missing data');
    let category;

    let doGetCategory = () => {
      return super.findById(id)
      .then(result => {
        category = result;
      })
    }

    let doUpdateSubs = () => {
      let doUpdateSub = (sub) => {
        return super.updateById(sub._id, {
          name: sub.name,
          displayIndex: sub.displayIndex || 1
        })
      }

      let subs = _.filter(data.subs, item => {
        return item._id && !item.isDeleted
      })

      return Promise.all(_.map(subs, sub => doUpdateSub(sub)))
    }

    let doCreateSubs = () => {
      let doCreateSub = (sub) => {
        return super.create({
          parent: category._id,
          name: sub.name,
          displayIndex: sub.displayIndex || 1
        }).then(result => {
          sub._id = result._id;
        })
      }

      let subs = _.filter(data.subs, item => {
        return !item._id && !item.isDeleted
      })

      return Promise.all(_.map(subs, sub => doCreateSub(sub)))
    }

    let doDeleteSubs = () => {
      let doDeleteSub = (sub) => {
        return this.deleteById(sub._id);     
      }

      let subs = _.filter(data.subs, item => {
        return item._id && item.isDeleted
      })

      return Promise.all(_.map(subs, sub => doDeleteSub(sub)))
    }

    let doUpdate = () => {
      let subs = _.filter(data.subs, item => {
        return item._id && !item.isDeleted
      })

      return super.updateById(category._id, {
        subs: subs
      })
    }

    return pipeline([
      doGetCategory,
      doUpdateSubs,
      doCreateSubs,
      doDeleteSubs,
      doUpdate
    ]);
  }

  deleteById(id) {
    if (!id) throw new Error('Missing id');
    let category;
    let subs = []

    let doGetCategory = () => {
      return super.findById(id)
      .then(result => {
        category = result;
      })
    }

    let doDeleteSubs = () => {
      if (!category.subs) return;

      let doDeleteSub = (sub) => {
        return this.deleteById(sub._id);     
      }

      return Promise.each(category.subs, doDeleteSub)
    }

    let doDelete = () => {
      return super.deleteById(category._id);
    }

    return pipeline([
      doGetCategory,
      doDeleteSubs,
      doDelete
    ]);
  }  
}