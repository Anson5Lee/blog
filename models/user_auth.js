const mongoose = require('mongoose');

const userAuthSchema = mongoose.Schema({
	authId: String,
	name: String,
	email: String,
	role: String,
	created: Date
})

module.exports = mongoose.model('UserAuth', userAuthSchema);