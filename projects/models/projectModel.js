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
    trim: true,
    required: true,
  },
  media: [{
    type: String,
    required: true,
  }],
  created_by: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    default: '2000-12-20',
  }],
  proposalId: {
    type: String,
    required: true,
  }
});


module.exports = Project;