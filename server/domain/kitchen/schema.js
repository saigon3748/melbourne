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
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true },
  orderCode: { type: String, required: true },
  orderRef: { type: String, required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'menus' },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 0 },
  category: mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    name: { type: String, required: true }
  }, { _id: false }),
  extra: [ 
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'addons' },
      name: { type: String, required: true },
      quantity: { type: Number, required: true, default: 0 },
      unitPrice: { type: Number, required: true, default: 0 },
      subtotal: { type: Number, required: true, default: 0 },
      discount: { type: Number, default: 0 },
      isPercentDiscount: { type: Boolean, default: false },
      total: { type: Number, required: true, default: 0 }
    }, { _id: false })
  ],  
  note: { type: String },
  isTakeaway: { type: Boolean, default: false }, 
  isCompleted: { type: Boolean, required: true, default: false }
})

schema.index({"orderCode": "text", "orderRef": "text", "name": "text", "note": "text", "category.name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('kitchens', schema)