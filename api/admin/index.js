const passport = require('passport');
const mongoose = require('mongoose');
const Admin = mongoose.model('admin');
const Article = mongoose.model('article');
const router = require('express').Router();
const multer = require('multer');


router.post('/login', passport.authenticate('admin'), function(req, res) {
    res.json(req.user);
})

router.post('/register', function(req, res) {
  var admin = new Admin(req.body);
  admin.save().then(function(admin) {
    res.json(admin);
  })
})

router.get('/loggedin', function(req, res) {
  res.json(req.isAuthenticated() ? req.user : 0);
})

router.get('/logout', function(req, res) {
  req.logout();
  res.send(200);
})

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'public/img/uploads');
  },
  filename: function(req, file, cb) {
		var timestamp = Date.now();
		cb(null, file.fieldname + '-' + timestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
	}
})

var upload = multer({
	storage: storage
}).single('file');

const auth = function(req, res, next) {
	if (!req.isAuthenticated()) {
		res.send(401);
	} else {
		next();
	}
}

router.post('/upload', auth, upload, function(req, res) {
  var path = req.file.path.split('/');
  path.splice(0,1);
  var filePath = path.join('/');
	res.json({"url": filePath });
})

router.get('/article', auth, function(req, res) {
	Article.find().then(function(data) {
    res.json(data);
  })
})

router.get('/api/user', auth, function(req, res) {
  User.find().then(function(data) {
    res.json(data);
  })
})

module.exports = router;
