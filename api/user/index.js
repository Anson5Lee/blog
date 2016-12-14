const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const router = require('express').Router();

// register a new user
router.post('/register', function(req, res) {
  var user = new User(req.body);

  if (user.email === 'frank5li@163.com') {
    user.isAdmin = true;
  }
  user.setPassword(req.body.password);
  user.save()
    .then(function(response) {
      var token = response.generateJwt();
      res.json({token: token});
    })
})

router.post('/login', passport.authenticate('user'), function(req, res) {
  var user = req.user;
  if (user) {
    var token = user.generateJwt();
    res.json({token: token});
  }
})

module.exports = router;
