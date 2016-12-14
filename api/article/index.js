const mongoose = require('mongoose');
const Article = mongoose.model('article');
const User = mongoose.model('user');
const router = require('express').Router();
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
})

// /////////////////////////////////////////
// List all the articles
// ////////////////////////////////////////

router.get('/', function(req, res) {
 // console.log(Article.find);
	Article.find()
		.then(function(data) {
			// console.log("here");
			res.json({data:data});
		})
		.catch(function(err){
			console.log(err);
		})
})

// ///////////////////////////////////////////////////////////
// get an article by Id
// //////////////////////////////////////////////////////////

router.get('/:id', function(req, res) {
  var id = req.params.id;
  if (id) {
    Article.findById({_id: id})
      .then(function(data) {
        res.json({data: data});
      })
  }
})

// ////////////////////////////////////////////////////////////
// post a new article
// ////////////////////////////////////////////////////////////


router.post('/', function(req, res) {
  console.log(req.body);
	var body = req.body;
  var article = new Article();
  article.title = body.title;
  article.content = body.content.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
  article.author = body.author;
	article.thumbnailUri = body.thumbnailUri;
	article.previewBanner = body.previewBanner;
	article.mainBanner = body.mainBanner;
  article.save()
    .then(function(article) {
      console.log(article);
    })
})

// ////////////////////////////////////////////////////////////
// Post a comment according to articleId
// ////////////////////////////////////////////////////////////

router.post('/:id/comment', auth, function(req, res) {
  var payload = req.payload;
  var articleId = req.params.id;
  var author = null;
  User
    .findOne({email: payload.email})
    .then(function(user) {
      author = user.name;
      return Promise.all([user, Article.findById({_id: articleId})])
    })
    .then(function(result) {
      var comment = req.body;
      comment.author = author;
      var article = result[1];
      article.comments.push(comment);
      return article.save()
    })
    .then(function(article) {
      console.log(article);
      var len = article.comments.length;
      res.json({data: article.comments[len - 1]});
    })
    .catch(function(err) {
      console.log(err);
    })
})


module.exports = router;
