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
        return { error: 'User not found' };
      }

      if (data.user.isArchived) {
        return { error: 'User is locked' };
      }

      if (!bscrypt.compareSync(credentials.pass, data.user.password)) {
        return { error: 'Incorrect username or password' };
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
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      isManager: user.isManager,
      tenant: user.tenant,
      exp: Math.floor(Date.now() / 1000) + (10 * 60 * 60)      
    }

    if (user.username === "sudo") {
      payload.isSudo = true;
    }

    return jwt.encode(payload, process.env.JWT_SECRET);
  }  
}