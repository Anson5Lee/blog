// /////////////////////////////////////////////////////
// POST /login handler
// /////////////////////////////////////////////////////

exports.authenticate = function(req, res, next) {
	// console.log(req);
	if (!req.body.email || ! req.body.password) {
		return res.render("login", {error: "请输入用户名和密码"})
	}
	req.models.User.findOne({
		email: req.body.email,
		password: req.body.password
	}, function(err, user) {
		// console.log(user);
		if (err) {
			return next(err);
		} else if (!user) {
			return res.render("login", {error: "用户名或密码不正确，请重新输入"})
		} else {
			req.session.user = user.email;
			req.session.admin = user.admin;
			res.redirect('/admin');
		}
	})
}

// ////////////////////////////////////////////////////////
// GET /login handler
// ////////////////////////////////////////////////////////

exports.login = function(req, res, next) {
	res.render('login');
}


// ///////////////////////////////////////////////////////
// GET /logout handler
// ///////////////////////////////////////////////////////

exports.logout = function(req, res, next) {
	req.session.destroy();
	res.redirect('/');
}

