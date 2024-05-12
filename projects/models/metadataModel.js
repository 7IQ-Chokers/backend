"use strict";
const mongoose = require("mongoose");
// Define a schema

const Metadata = new mongoose.Schema(
  {
    key: {
      type: String,
      trim: true,
      required: true,
    },
    value: {
      type: mongoose.SchemaTypes.Mixed,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Metadata;
