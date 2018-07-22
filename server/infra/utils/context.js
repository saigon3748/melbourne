const _ = require('lodash');
const Promise = require('bluebird');
const User = require('../../domain/user');

module.exports = class Context {
  constructor(user, req) {
    this.user = new User.Model(user);
    this.req = req;
  }
}