const _ = require('lodash');
const Boom = require('boom');
const mongoose = require('mongoose');

module.exports = class BaseService {
  constructor(repo, ctx, isTenantFiltered = true) {
    this._repo = repo;
    this._ctx = ctx;
    this._isTenantFiltered = isTenantFiltered;
  }

  findById(id, options) {
    if (!id) throw new Error('Missing id');

    return new Promise((resolve, reject) => {
      this._repo.findById(id, (err, result) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve(result);
      });
    });
  }

  findOne(query, options) {
    if (!query) throw new Error('Missing query');

    query = this._filterTenant(query);

    return new Promise((resolve, reject) => {
      this._repo.findOne(query, (err, result) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve(result);
      });
    });
  }

  find(query = {}, options) {
    if (!query) throw new Error('Missing query');

    query = this._filterTenant(query);

    if (options) {
      return new Promise((resolve, reject) => {
        this._repo.paginate(query, options, (err, result) => {
          if (err) throw Boom.badImplementation(err.message, err);
          resolve(result);
        });
      });      
    }

    return new Promise((resolve, reject) => {
      this._repo.find(query, (err, result) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve(result);
      });
    }); 
  }

  create(data) {
    if (!data) throw new Error('Missing data');
    data = this._appendTenant(data);

    _.extend(data, {
      createdAt: new Date(),
      createdBy: {
        _id: this._ctx.user._id,
        username: this._ctx.user.username,
        name: this._ctx.user.name
      }
    })

    return new Promise((resolve, reject) => {
      this._repo.create(data, (err, result) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve(result);
      });
    });
  }

  updateById(id, data) {
    if (!id) throw new Error('Missing id');
    if (!data) throw new Error('Missing data');

    let query = { _id: id };
    query = this._filterTenant(query);

    _.extend(data, {
      updatedAt: new Date(),
      updatedBy: {
        _id: this._ctx.user._id,
        username: this._ctx.user.username,
        name: this._ctx.user.name
      }
    })

    return new Promise((resolve, reject) => {
      this._repo.update(query, data, (err) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve();
      });
    });
  }

  update(query = {}, data) {
    if (!query) throw new Error('Missing query');
    if (!data) throw new Error('Missing data');

    query = this._filterTenant(query);

    _.extend(data, {
      updatedAt: new Date(),
      updatedBy: {
        _id: this._ctx.user._id,
        username: this._ctx.user.username,
        name: this._ctx.user.name
      }
    })

    let options = { multi: true };

    return new Promise((resolve, reject) => {
      this._repo.update(query, data, options, (err) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve();
      });
    });
  }

  deleteById(id) {
    if (!id) throw new Error('Missing id');

    let query = { _id: id };
    query = this._filterTenant(query);

    return new Promise((resolve, reject) => {
      this._repo.remove(query, (err) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve();
      });
    });
  }

  markDeleted(id) {
    if (!id) throw new Error('Missing id');

    let query = { _id: id };
    query = this._filterTenant(query);

    let data = {
      isDeleted: true,
      deletedAt: new Date(),
      deletedBy: {
        _id: this._ctx.user._id,
        username: this._ctx.user.username,
        name: this._ctx.user.name
      }
    }

    return new Promise((resolve, reject) => {
      this._repo.update(query, data, (err) => {
        if (err) throw Boom.badImplementation(err.message, err);
        resolve();
      });
    });
  }

  stream(query = {}, options) {
    if (!query) throw new Error('Missing query');

    query = this._filterTenant(query);
    return this._repo.find(query).stream();
  }

  _filterTenant(query) {
    if (!this._isTenantFiltered) return query;

    if (this._ctx.user.tenant) {
      if (query.$and) {
        query.$and.push({
          'tenant._id': new mongoose.Types.ObjectId(_.toString(this._ctx.user.tenant._id))        
        });
      } else {
        _.extend(query, {
          'tenant._id': new mongoose.Types.ObjectId(_.toString(this._ctx.user.tenant._id))
        });
      }
    }

    return query;
  }

  _appendTenant(data) {
    if (!this._isTenantFiltered) return data;

    //TODO
    if (!data.tenant && this._ctx.user.tenant) {
      data.tenant = _.clone(this._ctx.user.tenant);
    }

    return data;
  }
}