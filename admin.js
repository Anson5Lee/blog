const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/anson-blog');
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: String
}, {'collection': 'admin'});

const commentSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	commentBody: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	content: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	},
	tags: [String],
	comments: [commentSchema]
}, {collection: 'article'})

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  hash: String,
  salt: String
}, {"collection": "user"});

const Admin = mongoose.model('admin', adminSchema);
const Article = mongoose.model('article', articleSchema);
const User = mongoose.model('user', userSchema);

app.set('port', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, 'app_admin')));
app.use('/app_admin', express.static(path.join(__dirname, 'app_admin')));
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(cookieParser());
app.use(session({
  secret: "this is the secret",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(function(username, password, done) {
  Admin.findOne({username: username, password: password})
    .then(function(user) {
      return done(null, user);
    })
    .catch(function(err) {
      return done(null, false, {msssage: 'unable to login'});
    })
}))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post('/login', passport.authenticate('local'), function(req, res) {
    res.json(req.user);
})

app.post('/register', function(req, res) {
  var admin = new Admin(req.body);
  admin.save().then(function(admin) {
    res.json(admin);
  })
})

app.get('/loggedin', function(req, res) {
  res.json(req.isAuthenticated() ? req.user : 0);
})

app.get('/logout', function(req, res) {
  req.logout();
  res.send(200);
})
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './app_admin/uploads');
  },
  filename: function(req, file, cb) {
		var timestamp = Date.now();
		cb(null, file.fieldname + '-' + timestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
	}
})

var upload = multer({
	storage: storage
}).single('file');

app.post('/upload', upload, function(req, res) {
  console.log("hi");
	// console.log(req.file);
	// console.log(req.body);
	// {article : '{"author": "Anson", "title":"test"}'}
	// console.log(req.body.article);
	//{"author": "Anson", "title":"test"}
	// console.log(req.body.article.title);
	// undefined
	// console.log(req.body.article.author);
	// undefined
	res.json({"url": req.file.path })
})

app.post('/api/article', function(req, res) {
  console.log(req.body);
  var article = new Article();
  article.title = req.body.title;
  article.content = req.body.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  article.author = "Anson";
  article.save()
    .then(function(article) {
      console.log(article);
    })

})

const auth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.send(401);
	} else {
		next();
	}
}

app.get('/api/article', auth, function(req, res) {
	Article.find().then(function(data) {
    res.json(data);
  })
})

app.get('/api/user', auth, function(req, res) {
  User.find().then(function(data) {
    res.json(data);
  })
})



app.listen(app.get('port'));
