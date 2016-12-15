const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  hash: String,
  salt: String
}, {"collection": "user"});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
}

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return hash === this.hash;
}

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 10);
  var userInfoJSONString = JSON.stringify({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: parseInt(expiry.getTime()/1000),
  });
  var userInfoURIString = encodeURIComponent(userInfoJSONString);
  return jwt.sign(userInfoURIString, process.env.JWT_SECRET);
  // return jwt.sign({
  //   _id: this._id,
  //   email: this.email,
  //   name: this.name,
  //   exp: parseInt(expiry.getTime()/1000),
  // }, process.env.JWT_SECRET);
}

mongoose.model('user', userSchema);
