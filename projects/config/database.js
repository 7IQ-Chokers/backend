'use strict';
require('dotenv').config({
    path: 'config/.env',
  });

const mongoose = require('mongoose');
const username = process.env.ATLAS_USERNAME;
const password = process.env.ATLAS_PASSWORD;
const DB = process.env.MONGO_DATABASE_NAME;
const mongoDB = `mongodb+srv://${username}:${password}@7iq-chokers.b396h1w.mongodb.net/?retryWrites=true&w=majority&appName=7IQ-Chokers`;

async function createMongoConnection(mongoDB) {

  let connect = await mongoose.createConnection(mongoDB,
    {useNewUrlParser: true, useUnifiedTopology: true});
  return connect;
}

mongoose.Promise = global.Promise;


module.exports = {
  createMongoConnection,
  mongoURI: mongoDB,
};