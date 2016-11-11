const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/example');

const db = mongoose.connection;

db.once("open", function() {
	console.log("we are connected!")
});
