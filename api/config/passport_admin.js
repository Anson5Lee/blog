const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Admin = mongoose.model('admin');

passport.use('admin', new LocalStrategy(function(username, password, done) {
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
