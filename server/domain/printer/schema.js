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
  printer: { type: String, required: true },
  isChefReceipt: { type: Boolean, default: true },
  isPrintAuto: { type: Boolean, default: true },  
  title: { type: String },
  header1: { type: String },
  header2: { type: String },
  header3: { type: String },
  header4: { type: String },
  header5: { type: String },
  footer1: { type: String },
  footer2: { type: String },
  footer3: { type: String }
})

schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('printers', schema)