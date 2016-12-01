const mongoose = require('mongoose');
mongoose.Promise = Promise;
const ArticleModel = mongoose.model('ArticleModel');

// get article list
module.exports.getAllArticles = function(req, res) {
	ArticleModel
		.find()
		.sort({'createdOn': -1})
		.then(function(articles) {
			// console.log("here");
			res.json(articles);
		})
}
// create a new article
module.exports.createNewArticle = function(req, res) {
	ArticleModel
		.create({
			title: req.body.title,
			author: req.body.author,
			articleBody: req.body.articleBody,
			tags: req.body.tags
		})
		.then(function(article) {
			res.json(article);
		})
}
// get an article by Id
module.exports.getArticleById = function(req, res) {
	var articleId = req.params.aid;
	ArticleModel
		.findById({_id: articleId})
		.then(function(article) {
			res.json(article);
		})
}