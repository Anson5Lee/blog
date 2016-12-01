require('dotenv').load();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routesAmin = require('./routes');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mean-blog');

const passport = require('passport');
require('./app_api/config/passport');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/admin', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/app_client'));

app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(passport.initialize());
app.use(favicon('./favicon.png'));
require('./app_api/routes')(app);

// require('./routes')(app);
// require('./app_server/routes')(app);
app.get('/admin/', function(req, res) {
	res.render('login');
});
app.post('/admin', function(req, res) {

})
// app.get('/articles/:slug', routes.article.show);

// app.get('/login', routes.user.login);
// app.post('/login', routes.user.authenticate);
// app.get('/logout', routes.user.logout);
// app.get('/admin', authorize, routes.article.admin);

// app.get('/post', routes.article.post);
// app.post('/post', routes.article.postArticle);

app.listen(app.get('port'));
