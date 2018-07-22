const _ = require('lodash');
const mongodb = require('mongodb');
const pipeline = require('../../../libs/pipeline');
const UserSchema = require('../../../domain/user/schema');

module.exports = {
  do: function() {
    let doIndexText = () => {
      // mongodb.MongoClient.connect(process.env.MONGODB, function (err, db) {
      //   db.collection('tenants').ensureIndex({
      //     name: "text", 
      //     code: "text"
      //   }, {
      //     name: "text"
      //   })
      // })
    }

    return pipeline([
        doIndexText
      ]).catch(err => {
        console.log("An error occured in tenant database worker", err);
      })
  }
}
