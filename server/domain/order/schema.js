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
  code: { type: String, required: true, unique: true, uppercase: true },
  ref: { type: String, required: true, uppercase: true },
  subtotal: { type: Number, required: true, default: 0 },
  discount: { type: Number, required: true, default: 0 },
  tax: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true, default: 0 },
  cash: { type: Number },
  change: { type: Number },
  note: { type: String },
  place: { type: String },
  isTaxInclusive: { type: Boolean, default: true },
  isArchived: { type: Boolean, default: false },  
  items: [
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 },
      price: { type: Number, required: true, default: 0 },
      subtotal: { type: Number, required: true, default: 0 },
      note: { type: String },
      isTakeaway: { type: Boolean, default: false },
      category: mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
        name: { type: String, required: true }
      }, { _id: false }),
      addons: [ 
        mongoose.Schema({
          _id: { type: mongoose.Schema.Types.ObjectId, ref: 'addons' },
          name: { type: String, required: true },
          quantity: { type: Number, required: true, default: 0 },
          price: { type: Number, required: true, default: 0 },
          subtotal: { type: Number, required: true, default: 0 }
        }, { _id: false })
      ]
    }, { _id: false })
  ],
  discounts: [
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'discounts' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      amount: { type: Number, required: true },
      discount: { type: Number, required: true },
      isPercentOff: { type: Boolean, default: false },
      isAddonsInclusive: { type: Boolean, default: true },
      isMostExpensive: { type: Boolean, default: false },
      isLeastExpensive: { type: Boolean, default: false },
      category: mongoose.Schema({
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
        name: { type: String, required: false }
      }, { _id: false }),
    }, { _id: false })
  ]
})

schema.index({"code": "text", "note": "text", "items.name": "text", "items.note": "text", "items.category.name": "text", "discounts.name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('orders', schema)