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
  discount: { type: Number, required: true },
  isPercentage: { type: Boolean, default: false },
  isAddonsInclusive: { type: Boolean, default: true },
  isMostExpensive: { type: Boolean, default: false },
  isLeastExpensive: { type: Boolean, default: false },
  isCategoryApplied: { type: Boolean, default: false },      
  category: mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    name: { type: String, required: true }
  }, { _id: false }),  
  isDateApplied: { type: Boolean, default: false },
  fromDate: { type: Date, required: false },
  toDate: { type: Date, required: false },
  isArchived: { type: Boolean, default: false }
})

schema.index({"name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('discounts', schema)