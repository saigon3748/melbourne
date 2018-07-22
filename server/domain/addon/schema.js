const _ = require('lodash');
const bscrypt = require('bcryptjs');
const mongoose = require('mongoose');
const audit = require('../audit');
const paginate = require('mongoose-paginate');

let schema = mongoose.Schema({
  tenant: {
    type: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'tenants' },
      code: { type: String, required: true },
      name: { type: String, required: true }
    }, { _id: false })
  },
  name: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  isPercentDiscount: { type: Boolean, default: false }
})

schema.index({"name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('addons', schema)