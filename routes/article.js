// ///////////////////////////////////////
// GET /admin handler
// ///////////////////////////////////////

exports.admin = function(req, res, next) {
	req.models.Article.list(function(err, articles) {
		if (err) {return next(err)}
		res.render("admin", {articles: articles});
	})
}

// /////////////////////////////////////
// Show an article handler
// /////////////////////////////////////
exports.show = function(req, res, next) {
	if (!req.params.slug) return next(new Error('请提供文章描述！'));
	console.log(req.params);
	req.models.Article.findOne({slug: req.params.slug}, function(error, article) {
    if (error) return next(error);
    // if (!article.published && !req.session.admin) return res.send(401);
    res.render('article', article);
  });
}

// exports.list = function(req, res, next) {
//   req.models.Article.list(function(error, articles) {
//     if (error) return next(error);
//     res.send({articles: articles});
//   });
// };

// ／／／／／／／／／／／／／／／／／／／／／／／／／／
// GET /post handler 
// ///////////////////////////////////////////
exports.post = function(req, res, next) {
	if (!req.body.title) 
	res.render('post')
}

// ／／／／／／／／／／／／／／／／／／／／／／／／／／
// POST /post handler 
// ///////////////////////////////////////////
exports.postArticle = function(req, res, next) {
	if (!req.body.title || !req.body.slug || !req.body.text ) {
    	return res.render('post', {error: '请填写标题, 简称和文章内容.'});
  	}
  	var article = {
	    title: req.body.title,
	    slug: req.body.slug,
	    text: req.body.text,
	    published: false
  	};
	req.models.Article.create(article, function(error, articleResponse) {
	  if (error) return next(error);
	  res.render('post', {error: '文章已经保存，点击发布后即可被粉丝看到哦！'});
	});
}

// /////////////////////////////////////////////
// RESTful APIs
// /////////////////////////////////////////////

// delete an article
exports.delete = function(req, res, next) {
	if (!req.params.id) return next(new Error('请提供博客文章ID!'));
	req.models.Article.findById(req.params.id, function(error, article) {
		if (error) return next(error);
		if (!article) return next(new Error('未找到对应文章！！！'));
		article.remove(function(err, doc) {
			if (err) return next(err);
			console.log(doc);
			res.send(doc);
		})
	})
}

// update an article
exports.update = function(req, res, next){
	if (!req.params.id) return next(new Error("请提供博客文章ID!"));
	req.models.Article.findById(req.params.id, function(error, article) {
		if (error) return next(error);
		article.update({$set: req.body.article}, function(error, count, raw){
      		if (error) return next(error);
      		res.send({affectedCount: count});
    	})
	})
}































