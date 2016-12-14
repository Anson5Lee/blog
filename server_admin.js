require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const passport = require('passport');
const session = require('express-session');
const bcrypt = require('bcrypt');
require('./db');
require('./api/config/passport_admin.js');
app.set('port', process.env.PORT || 5000);
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/spa_admin')));
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(favicon(__dirname + '/public/favicon.png'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

require('./api/routes')(app);
app.listen(app.get('port'));
