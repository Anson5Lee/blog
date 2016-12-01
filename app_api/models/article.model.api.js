const mongoose = require('mongoose');
mongoose.set('debug', true);
const commentSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true
	},
	commentBody: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	}
});

const articleSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	articleBody: {
		type: String,
		required: true
	},
	createdOn: {
		type: Date,
		"default": Date.now
	},
	tags: [String],
	comments: [commentSchema]
}, {collection: 'article'})


module.exports = mongoose.model('ArticleModel', articleSchema);
