const mongoose = require('mongoose');

module.exports = function(schema) {
  schema.add({
    createdAt: { type: Date, default: Date.now },
    createdBy: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      username: { type: String },
      name: { type: String }
    }),

    updatedAt: { type: Date },
    updatedBy: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      username: { type: String },
      name: { type: String }
    }),

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      username: { type: String },
      name: { type: String }
    })
  });
};

