const passport = require('passport');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const User = mongoose.model('User');

const sendJSONRes = function(res, status, content) {
	res.status(status);
	res.json(content);
}

module.exports.register = function(req, res) {
	if (!req.body.name || !req.body.email || !req.body.password) {
		sendJSONRes(res, 400, {"message": "All fields required"});
		return;
	}
	var user = new User();
	user.email = req.body.email;
	user.name = req.body.name;
	user.setPassword(req.body.password);
	user
		.save()
		.then(function(response) {
			var token = response.generateJwt();
			sendJSONRes(res, 200, {"token": token});
		})
}

module.exports.login = function(req, res) {
	if (!req.body.email || !req.body.password) {
		sendJSONRes(res, 400, {"message": "All fields required"});
		return;
	}
	passport.authenticate('local', function(err, user, info) {
		var token;
		if(err) {
			sendJSONRes(res, 404, err);
			return;
		}
		if(user) {
			token = user.generateJwt();
			sendJSONRes(res, 200, {"token": token});
		} else {
			sendJSONRes(res, 401, info);
		}
	})(req, res)
}