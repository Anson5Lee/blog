const article = require('./article');
const user = require('./user');

// get home page

const index = function(req, res, next) {
	req.collections.articles.find({published: true}, {sort: {_id:-1}}).toArray(function(error, articles){
    		if (error) return next(error);
    		res.render('index', { articles: articles});
})}


module.exports = {  
	user: user,
	article: article,
	index: index
}