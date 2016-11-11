// /////////////////////////////////////////
// Required
// /////////////////////////////////////////

const http = require('http');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const models = require('./models');

// //////////////////////////////////////////
// Connect to mongo
// //////////////////////////////////////////

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

const db = mongoose.connection;
db.once("open", function() {
	console.log("we are connected!")
});

// /////////////////////////////////////////
// Initialize & Config the app
// /////////////////////////////////////////
const app = express();
app.locals.appTitle = 'Frank Lee';
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// /////////////////////////////////////////
// Middlewares
// ////////////////////////////////////////


app.use(function(req, res, next) {
	if (!models.User || !models.Article) {
		next(new Error("no models"));
	} else {
		req.models = models;
		next();
	}
})



app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: "pleasedonothackmyblog"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/articles', express.static(path.join(__dirname, '/public')));
// Authentication middleware
app.use(function(req, res, next) {
	if (req.session && req.session.admin) {
		res.locals.admin = true;
	} 
	next();
})

// Authorization middleware
const authorize = function(req, res, next) {
	if (req.session && req.session.admin) {
		return next();
		// res.send("hello admin");
		// console.log("hi admin");
	} else {
		res.send(401);
	}
}

// /////////////////////////////////////////
// routes 
// /////////////////////////////////////////

app.get('/', routes.index);
app.get('/articles/:slug', routes.article.show);

app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);
app.get('/admin', authorize, routes.article.admin);

app.get('/post', routes.article.post);
app.post('/post', routes.article.postArticle);

// APIs
app.all('/api/*', authorize);
app.del('/api/articles/:id', routes.article.delete);
app.put('/api/articles/:id', routes.article.update);

app.all('*', function(req, res) {
	res.sendStatus(404);
});

const server = http.createServer(app);

server.listen(app.get('port'), function() {
	console.log("The server is running on port " + app.get('port'));
});























































