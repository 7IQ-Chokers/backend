'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

  
const Proposal = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  media: [{
    type: String,
    required: true,
  }],
  problemId: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    default: '2000-12-20',
  }]
});


module.exports = Proposal;