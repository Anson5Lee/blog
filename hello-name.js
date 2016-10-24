var express = require('express');
var port = 3000;
var app = express();

// config the route

app.get('/name/:user_name', function(req, res) {
	res.status(200);
	res.set('Content-Type', 'text/html');
	res.send('<html><body><h1>hello '+ req.params.user_name + '</h1></body></html>');
})

app.get('*', function(req, res) {
	res.end("hellow world");
})
app.listen(port, function() {
	console.log("The server is running at 127.0.0.1:3000/");
})