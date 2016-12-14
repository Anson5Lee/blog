const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('user');
passport.use('user', new LocalStrategy({
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
	// console.log(user);
  done(null, user);
});


passport.deserializeUser(function(user, done) {
  done(null, user);
});
