// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';

var https = require('https');

import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';

enableProdMode();

// Express server
const app = express();

const PORT = process.env.PORT || 4000;

const DIST_FOLDER = join(process.cwd(), 'dist');

// mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://test:test@ds147589.mlab.com:47589/heroku_rwft30zq');
// mongoose.connect('mongodb://127.0.0.1:27017/management');
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// Get the default connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const UserSchema = mongoose.Schema({
  id: Number, 
  name: String ,
  url: String,
  active: Boolean,
  role: String,
  mail: String,
  phoneNumber: String,
  location: String,
  joinDate: String,
});

var UserModel = mongoose.model('User', UserSchema);
const bodyParser = require('body-parser');


// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// TODO: implement data requests securely
app.get('/api/v1/users', function(req, res) {

  if(req.query && req.query.search) {
    UserModel.find({ name: new RegExp(req.query.search, 'i')}, null, (err, resp) => {
      res.send(resp)
    });
  } else {
    UserModel.find((err, resp) => {
      res.send(resp);
    });
  }
});

app.put('/api/v1/users', function(req, res) {
  UserModel.findByIdAndUpdate(req.body._id, req.body, function (err, resp) {
    res.send(resp);
  });
});

app.post('/api/v1/users', function(req, res) {
  UserModel.create(req.body, function(err, resp) {
    res.send(resp);
  });
});

app.delete('/api/v1/users/:_id', function(req, res) {
  UserModel.findByIdAndRemove(req.params._id, function (err, resp) {
    res.send(resp);
  });
});

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
/*app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});
*/

app.get('*', (req, res) => {
  res.render('./', {
    req,
    res,
    providers: [
      {
        provide: 'serverUrl',
        useValue: `${req.protocol}://${req.get('host')}`
      }
    ]
  });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
