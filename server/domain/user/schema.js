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
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  isManager: { type: Boolean, default: false },
  isLocked: { type: Boolean, default: false },
  lastLogin: { type: Date, default: Date.now }
})

schema.index({"username": "text", "name": "text"})

schema.plugin(audit);
schema.plugin(paginate);

schema.pre('save', function (next) {
  this.lastLogin = Date.now();

  if (!this.isModified('password') && !this.isNew) return next();
  this.password = bscrypt.hashSync(this.password);
  next();
});

module.exports = mongoose.model('users', schema)