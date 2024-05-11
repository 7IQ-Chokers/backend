'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Investment = new Schema({
  investor: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  project: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Project'
  },
  status: {
    type: String,
    required: true,
  },
});


module.exports = Investment;