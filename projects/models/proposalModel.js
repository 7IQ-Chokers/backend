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
    trim: true
  },
  media: [{
    type: String
  }],
  problem: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Problem'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  tags: [{
    type: String
  }],
  comments: [{
    id: String,
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    text: String
  }]
});


module.exports = Proposal;