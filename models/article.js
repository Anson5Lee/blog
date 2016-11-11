const mongoose = require('mongoose');
// ///////////////////////////////////////////////////
// ArticleSchema definition
// ///////////////////////////////////////////////////
const articleSchema = mongoose.Schema({
	title: {
		type: String,
    	required: true,
    	validate: [function(value) {return value.length<=120}, 'Title is too long (120 max)'],
    	default: 'New Post'
	},
	published: {
		type: Boolean,
		default: false
	}, 
	text: String,
	slug: {
	    type: String,
	    set: function(value){return value.toLowerCase().replace(' ', '-')}
	}
});

// ///////////////////////////////////////////////////////
// ArticleSchema statics
// ///////////////////////////////////////////////////////

articleSchema.statics.list = function(callback) {
	return this.find({}, null, {sort: {_id: -1}}, callback)
}


module.exports = mongoose.model('Article', articleSchema);