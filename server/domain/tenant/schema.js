const _ = require('lodash');
const bscrypt = require('bcryptjs');
const mongoose = require('mongoose');
const audit = require('../audit');
const paginate = require('mongoose-paginate');

let schema = mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  name: { type: String, required: true },
  isLocked: { type: Boolean, default: false },  
  subs: [
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'tenants' },
      code: { type: String, required: true },
      name: { type: String, required: true }
    }, { _id: false })
  ],
  settings: {
    type: mongoose.Schema({
      utc: { type: Number },
      receiptPrinter: { type: String },
      kitchenPrinter: { type: String },
      confirmAndPrint: { type: Boolean },
      isInclusiveGST: { type: Boolean, default: true },
      receiptTemplate: {
        type: mongoose.Schema({
          receiptName: { type: String },
          header1: { type: String },
          header2: { type: String },
          header3: { type: String },
          header4: { type: String },
          header5: { type: String },
          footer1: { type: String },
          footer2: { type: String },
          footer3: { type: String }
        }, { _id: false })        
      }
    }, { _id: false })
  }
})

schema.index({"code": "text", "name": "text"})
 
schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('tenants', schema)