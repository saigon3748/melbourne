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
  displayIndex: { type: Number, default: 1 },
  parent: mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
    name: { type: String, required: true }
  }, { _id: false }),  
  subs: [ 
    mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
      name: { type: String, required: true },
      displayIndex: { type: Number, default: 1 }
    }, { _id: false })
  ],
  isArchived: { type: Boolean, default: false }  
})

schema.index({"name": "text", "parent.name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

module.exports = mongoose.model('categories', schema)