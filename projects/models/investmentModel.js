'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Investment = new Schema({
  investorId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});


module.exports = Investment;