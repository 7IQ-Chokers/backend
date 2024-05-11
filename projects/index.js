'use strict';
require('dotenv').config({
  path: 'config/.env',
});

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createMongoConnection } = require('./config/database');
const problemRoutes = require("./routes/problem");
const proposalRoutes = require("./routes/proposal");
const investmentRoutes = require("./routes/investment");
const projectRoutes = require("./routes/project");

// database configuration

const app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token
const { mongoURI } = require('./config/database');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: true}));

const validateUser = (req, res, next) => {
  next();
};

app.use("/problems", validateUser, problemRoutes);
app.use("/proposals", validateUser, proposalRoutes);
app.use("/investments", validateUser, investmentRoutes);
app.use("/projects", validateUser, projectRoutes);


app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({message: 'Not found'});
  else
    res.status(500).json({message: 'Something looks wrong :( !!!'});
});

console.log('=> Connecting to MongoDB Atlas...');
createMongoConnection(mongoURI).then((connection) => {

  global.User = connection.model('User', require('./models/userModel'));
  global.Proposal = connection.model('Proposal', require('./models/proposalModel'));
  global.Project = connection.model('Project', require('./models/projectModel'));
  global.Problem = connection.model('Problem', require('./models/problemModel'));
  global.Organization = connection.model('Organization', require('./models/organizationModel'));
  global.Investment = connection.model('Investment', require('./models/investmentModel'));

  connection.on('error',
    console.error.bind(console, 'MongoDB connection error:'));

  var port = 4000;
  app.listen(port, function(){
    console.log(`=> Server running on port ${port}...`);
  });
}).catch((err) => {
  console.log(err);
});