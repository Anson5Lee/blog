const mongoose = require('mongoose');
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
	thumbnailUri: {
		type: String,
		required: true
	},
	previewBanner: {
		type: String,
		required: true
	},
	mainBanner: {
		type: String,
		required: true
	},
	content: {
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


mongoose.model('article', articleSchema);
