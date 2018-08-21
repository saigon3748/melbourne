const _ = require('lodash');
const bscrypt = require('bcryptjs');
const mongoose = require('mongoose');
const audit = require('../audit');
const paginate = require('mongoose-paginate');

let schema = mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  name: { type: String, required: true },
  parent: {
    type: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'tenants' },
      code: { type: String, required: true },
      name: { type: String, required: true }
    }, { _id: false })
  },
  utc: { type: Number, default: 0 },
  isTaxInclusive: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false }
})

schema.index({"code": "text", "name": "text"})
 
schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('tenants', schema)