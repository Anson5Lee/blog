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
		"dafault": Date.now
	}
}, {collection: 'comment'})

// mongoose.model('CommentModel', commentSchema);