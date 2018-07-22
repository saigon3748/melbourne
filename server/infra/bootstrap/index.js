const { EventEmitter } = require('events');
const MongoDb = require('./mongodb');

module.exports = class Bootstrap extends EventEmitter {
  start() {
    new MongoDb().init();
  }
}
