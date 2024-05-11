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
    trim: true,
    required: true,
  },
  media: [{
    type: String,
    required: true,
  }],
  location: GeoSchema,
  created_by: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    default: '2000-12-20',
  }],
  isLocationAgnostic: {
    type: Boolean,
    default: false
  }
});


module.exports = Problem;