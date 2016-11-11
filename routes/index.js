exports.user = require('./user');
exports.article = require('./article')

// homepage handler

exports.index = function(req, res, next) {
  req.models.Article.find({published: true}, null, {sort: {_id:-1}}, function(err, articles) {
  	if (err) {
  		console.log(err);
  	} else {
  		res.render('index', {articles: articles});
  	}
  })
};

