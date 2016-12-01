const express = require('express');
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
})
const articleCtrl = require('../controllers/article.controller.api.js');
const commentCtrl = require('../controllers/comment.controller.api.js');
const ctrlAuth = require('../controllers/authentication.controller.js');
// const passport = require('passport');
module.exports = function(app) {
	app.get('/api/article', articleCtrl.getAllArticles);
	app.post('/api/article', articleCtrl.createNewArticle);
	app.get('/api/article/:aid', articleCtrl.getArticleById);

	app.post('/register', ctrlAuth.register);
	app.post('/login', ctrlAuth.login);

	// comments
	app.post('/api/article/:aid/comment', auth, commentCtrl.addCommentByArticleId);
}

