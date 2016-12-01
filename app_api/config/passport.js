const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const User = require('../user/model.js');
passport.use(new LocalStrategy({
		usernameField: 'email'
	},

	function(username, password, done) {
		User
			.findOne({email: username})
			.then(function(user) {
				if (!user.validPassword(password)) {
					return done(null, false, {message: 'Incorrect password.'});
				}
				return done(null, user);
			})
	}
))


passport.serializeUser(function(user, done) {
  done(null, user);
});


passport.deserializeUser(function(user, done) {
  done(null, user);
});
