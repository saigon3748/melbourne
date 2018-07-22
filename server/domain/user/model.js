const _ = require('lodash');
const Promise = require('bluebird');
const bscrypt = require('bcryptjs');
const BaseModel = require('../base-model');

module.exports = class User extends BaseModel {
  constructor(data) {
    super(data);
  }

  get isSudo() {
    return this.username === "sudo"
  }
}