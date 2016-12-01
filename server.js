require('dotenv').load();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routesAmin = require('./routes');
const passport = require('passport');
require('./app_api/config/passport');

const app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/app_client'));

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(favicon('./favicon.png'));
require('./app_api/routes')(app);

app.get('/admin/', function(req, res) {
	res.render('login');
});
app.post('/admin', function(req, res) {

})

app.listen(app.get('port'));
