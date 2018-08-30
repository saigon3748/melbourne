const mongoose = require('mongoose');

module.exports = function(schema) {
  schema.add({
    localCreatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    createdBy: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      username: { type: String }
    }),

    localUpdatedAt: { type: Date },
    updatedAt: { type: Date },
    updatedBy: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      username: { type: String }
    }),

    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deletedBy: mongoose.Schema({
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      username: { type: String }
    })
  });
};

