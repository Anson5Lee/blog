const mongoose = require('mongoose');
mongoose.Promise = Promise;
const ArticleModel = require('../models/article.model.api.js');

module.exports = {
	addCommentByArticleId : commentCreate
}


function commentCreate(req, res) {
	if (req.params.aid) {
		ArticleModel
			.findOne({'_id': req.params.aid}, function(err, article) {
				article.comments.push({
					author: req.body.author,
					commentBody: req.body.commentBody
				});
				article.save().then(function(article) {
					let len = article.comments.length;
					res.json(article.comments[len-1]);
				})
			})
	}
}
	


function getAuthor(res, req, callback) {
	console.log(req.payload.email);
}