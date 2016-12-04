require('dotenv').load();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const passport = require('passport');
require('./app_api/config/passport.js');
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'app_client')));
app.use('/app_admin', express.static(path.join(__dirname, 'app_admin')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(favicon('./favicon.png'));
require('./app_api')(app);

app.listen(app.get('port'));
