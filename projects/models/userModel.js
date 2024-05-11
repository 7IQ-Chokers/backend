'use strict';
const mongoose = require('mongoose');
// Define a schema

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    trim: true,
    required: true,
  },
  interests: [{
    type: String,
    trim: true,
    required: true,
  }],
  dateOfBirth: {
    type: Date,
    default: '2000-12-20',
  },
  isInvestor: {
    type: Boolean,
    default: false
  },
  orgId: {
    type: String,
  },
  calendlyLink: {
    type: String,
    required: true,
  },
  currentOtp: {
    type: String,
    length: 6
  }
});

// hash user password before saving into database
User.pre('save', function(next){
  next();
});

module.exports = User;