'use strict';
const mongoose = require('mongoose');
// Define a schema

const Schema = mongoose.Schema;

const GeoSchema = Schema({
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number], //the type is an array of numbers
      index: "2dsphere"
    }
  })
  

const Problem = new Schema({
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
  location: GeoSchema,
  createdBy: {
    type: String,
    required: true,
  },
  tags: [{
    type: String
  }],
  isLocationAgnostic: {
    type: Boolean,
    default: false
  }
});

Problem.index({ "location.coordinates": "2dsphere" }); 

module.exports = Problem;