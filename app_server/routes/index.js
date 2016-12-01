const UserModel = require('../../app_api/models/user.model.api.js');

module.exports = function (app) {
	app.get('/admin', function(res, req) {
		res.render('login');
	})
	app.post('/admin', function(req, req) {})
	
}