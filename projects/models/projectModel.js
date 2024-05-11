'use strict';
const mongoose = require('mongoose');
// Define a schema

const Schema = mongoose.Schema;

const Project = new Schema({
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
  createdBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  tags: [{
    type: String
  }],
  proposal: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Proposal'
  },
  upvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});


module.exports = Project;