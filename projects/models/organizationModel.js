'use strict';
const mongoose = require('mongoose');
// Define a schema

const Schema = mongoose.Schema;

const Organization = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  }
});

// hash user password before saving into database
Organization.pre('save', function(next){
  next();
});

module.exports = Organization;