const _ = require('lodash');
const Promise = require('bluebird');
const jwt = require('jwt-simple');
const bscrypt = require('bcryptjs');
const basicAuth = require('basic-auth');
const BaseController = require('../base-controller');
const Domain = require('../../../../domain');
const pipeline = require('../../../../libs/pipeline');

module.exports = class Controller extends BaseController {
  constructor(ctx) {
    super(ctx, Domain.UserService);
  }

  login() {
    let data = {};
    let credentials = basicAuth(this._ctx.req);

    let doGetUser = () => {
      return this._service.findOne({username: credentials.name})
        .then(user => {
          data.user = user;
        })
    }

    let doLogin = () => {
      if (!data.user) {
        return { error: 'User not found.' };
      }

      if (data.user.isLocked) {
        return { error: 'User is locked.' };
      }

      if (!bscrypt.compareSync(credentials.pass, data.user.password)) {
        return { error: 'Incorrect login ID or password.' };
      }

      return { token: this._generateToken(data.user) };
    }

    return pipeline([
      doGetUser,
      doLogin
    ])
  }

  _generateToken(user) {
    let payload = {
      _id: user._id,
      name: user.name,
      username: user.username,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      tenant: user.tenant,
      exp: Math.floor(Date.now() / 1000) + (10 * 60 * 60)      
    }

    return jwt.encode(payload, "noel");
  }  
}