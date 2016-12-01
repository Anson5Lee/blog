// /////////////////////////////////////////
// Required
// /////////////////////////////////////////
const fs = require('fs');
const http = require('http');
const https = require('https');
// define ssl public keys and digital certificate
const options = {
	key: fs.readFileSync(__dirname + '/ssl/blog_dev.pem'),
	cert: fs.readFileSync(__dirname + '/ssl/blog_dev.crt')
}

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const expressLogger = require('express-logger');
const favicon = require('serve-favicon');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const models = require('./models');
const credentials = require('./credentials');

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
app.set('port', process.env.PORT || 5000);
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


switch(app.get('env')) {
	case 'development':
		console.log(app.get('env'));
		console.log("logger is morgan");
		app.use(morgan('dev'));
		break;
	case 'production':
		app.use(expressLogger({path: __dirname + '/log/requests.log'}))
		console.log("logger is expressLogger");
		break;
}
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: "pleasedonothackmyblog"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/articles', express.static(path.join(__dirname, '/public')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// /////////////////////////////////////////////////////
// Authentication
// ////////////////////////////////////////////////////

// custom authentication middleware
app.use(function(req, res, next) {
	if (req.session && req.session.admin) {
		res.locals.admin = true;
	} 
	next();
})

// authentication using passport as well as passport-facebook strategy

const auth = require('./lib/auth.js')(app, {
	providers: credentials.authProviders,
	successRidirect: '/login',
	failureRidirect: '/login',
})

auth.init();
auth.registerRoutes();

// Authorization middleware
const authorize = function(req, res, next) {
	if (req.session && req.session.admin) {
		return next();
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

// /////////////////////////////////////////////////////////
// APIs
// //////////////////////////////////////////////////////////

// app.all('/api/*', authorize);
app.delete('/api/articles/:id', routes.article.delete);
app.put('/api/articles/:id', routes.article.update);

// 404 catch-all handler (middleware)
app.all('*', function(req, res) {
	res.sendStatus(404);
});

// ///////////////////////////////////////////////////////
// Boot configuration
// ///////////////////////////////////////////////////////

function startServer() {
	http.createServer(app).listen(app.get('port'), function() {
		console.log( 'Express started in ' + app.get('env') +
            ' mode on http://localhost:' + app.get('port') +
            '; press Ctrl-C to terminate.' );
	})
}

// function startServer() {
// 	https.createServer(options, app).listen(app.get('port'), function() {
// 		console.log( 'Express started in ' + app.get('env') +
//             ' mode on http://localhost:' + app.get('port') +
//             '; press Ctrl-C to terminate.' );
// 	})
// }


if (require.main === module) {
	// application run directly; start app server
	console.log("run as an app");
	startServer();
} else {
	// application imported as a module via 'require': export function
	// to create server
	module.exports = startServer;
}
























































