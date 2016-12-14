const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, {promiseLibrary: global.Promise});

// console.log(mongoose.connection);
// CONNECTION EVENTS
// When successfully connected
// connection.on('connected', function () {
//   console.log('Mongoose default connection open to ' + process.env.MONGODB_URI);
// });
//
// // If the connection throws an error
// connection.on('error',function (err) {
//   console.log('Mongoose default connection error: ' + err);
// });
//
// // When the connection is disconnected
// connection.on('disconnected', function () {
//   console.log('Mongoose default connection disconnected');
// });
//
// // If the Node process ends, close the Mongoose connection
// process.on('SIGINT', function() {
//   connection.close(function () {
//     console.log('Mongoose default connection disconnected through app termination');
//     process.exit(0);
//   });
// });

require('./article.js');
require('./user.js');
require('./admin.js');
