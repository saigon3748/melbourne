const pipeline = require('../../../libs/pipeline');
const Tenant = require('./tenant');
const User = require('./user');

module.exports = {
  run: function() {
    return pipeline([
        Tenant.do,
        User.do
      ]).catch(err => {
        console.log("An error occured in database worker", err);
      })
  }
}
