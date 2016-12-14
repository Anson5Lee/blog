require('dotenv').load();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./db');
require('./api/config/passport_user.js');
const app = express();
app.set('port', process.env.PORT || 3000);
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/spa_client')));
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "http://localhost");
// 	res.header("Access-Control-Allow-Credentials", "true");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });
app.use(passport.initialize());
// app.use(favicon(__dirname + '/public/favicon.png'));
require('./api/routes')(app);
// app.get('*', function(req, res) {
//   res.sendFile(__dirname + '/public/spa_client/index.html')
// });
app.listen(app.get('port'));
