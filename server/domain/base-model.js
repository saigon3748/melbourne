const _ = require('lodash');

module.exports = class BaseModel {
  constructor(data){
    if (_.hasIn(data, 'toJSON')) {
      _.extend(this, data.toJSON());
    } else {
      _.extend(this, data);
    }
  }
}