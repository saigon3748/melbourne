const _ = require('lodash');
const mongodb = require('mongodb');
const pipeline = require('../../../libs/pipeline');
const UserSchema = require('../../../domain/user/schema');

module.exports = {
  do: function() {
    let doSeedData = () => {
      UserSchema.findOne({ username: 'sudo' })
        .then(item => {
          if (!item) {
            UserSchema.create({
              username: 'sudo',
              password: 'nemo',
              name: 'sudo'
            });
          }
        });
    }

    return pipeline([
        doSeedData
      ]).catch(err => {
        console.log("An error occured in user database worker", err);
      })
  }
}
