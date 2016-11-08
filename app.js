// //////////////////////////////////////////////
// Required
// //////////////////////////////////////////////
const http = require('http');
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const mongoskin = require('mongoskin');
const logger = require('morgan');
// A favicon is a visual cue that client software, like browsers, use to identify a site
const favicon = require('serve-favicon');

const  cookieParser = require('cookie-parser');
const  session = require('express-session');

const  bodyParser = require('body-parser');

const routes = require('./routes');

const dbUrl = process.env.MONGOHQ_URL || 'mongodb://@localhost:27017/blog';
const db = mongoskin.db(dbUrl, {safe: true});
const collections = {
  articles: db.collection('articles'),
  users: db.collection('users')
};


// Development-only error handler middleware.
const  errorHandler = require('errorhandler');
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
const  methodOverride = require('method-override');

var app = express();

app.locals.appTitle = 'blog-express';

app.use(function(req, res, next) {
  if (!collections.articles || ! collections.users) return next(new Error("No collections."))
  req.collections = collections;
  return next();
});


// app configurations 

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



// middleware configuration

app.use(logger('dev'));
app.use(methodOverride());
app.use(favicon(__dirname + '/public/react.png'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: "donothackmypersonalblog"}));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));


// Authentication middleware
app.use(function(req, res, next) {
  if (req.session && req.session.admin)
    res.locals.admin = true;
  next();
});

// Authorization Middleware
var authorize = function(req, res, next) {
  if (req.session && req.session.admin)
    return next();
  else
    return res.send(401);
};



// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Pages and routes
app.get('/', routes.index);

app.get('/login', routes.user.login);
app.post('/login', routes.user.authenticate);
app.get('/logout', routes.user.logout);

app.get('/admin',  routes.article.admin);

app.get('/post',  routes.article.post);
app.post('/post', routes.article.postArticle);
app.get('/articles/:slug', routes.article.show);

// REST API routes
// app.get('/api/articles', routes.article.list);
// app.post('/api/articles', routes.article.add);
// app.put('/api/articles/:id', routes.article.edit);
// app.del('/api/articles/:id', routes.article.del);



app.all('*', function(req, res) {
  res.send(404);
})

// http.createServer(app).listen(app.get('port'), function(){
  // console.log('Express server listening on port ' + app.get('port'));
// });

var server = http.createServer(app);
var boot = function () {
  server.listen(app.get('port'), function(){
    console.info('Express server listening on port ' + app.get('port'));
  });
}
var shutdown = function() {
  server.close();
}
if (require.main === module) {
  boot();
} else {
  console.info('Running app as a module')
  exports.boot = boot;
  exports.shutdown = shutdown;
  exports.port = app.get('port');
}




























