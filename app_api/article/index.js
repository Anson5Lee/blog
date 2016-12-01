require('../db');
require('mongoose').Promise = Promise;
const Article = require('./model.js');
const User = require('../user/model.js');
const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
})

// /////////////////////////////////////////
// List all the articles
// ////////////////////////////////////////

router.get('/', function(req, res) {
  Article.find(function(err, data) {
    if (err) {console.log(err)}
    res.json({data: data});
  })
})

// ///////////////////////////////////////////
// Add a new article
// ///////////////////////////////////////////

router.post('/', function(req, res) {
  var article = new Article(req.body);
  article.save(function(err, data) {
    if (err) {console.log(err)}
    res.json({data: data});
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
