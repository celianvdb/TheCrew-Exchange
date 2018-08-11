var bcrypt = require('bcrypt-nodejs');
var Token = require('./token.js');
var mongoose = require('mongoose');
var security = require('./security.js');

var Schema = mongoose.Schema;

var User = new Schema({
	username: { type : String},
	mail: { type : String},
	uplay: { type : String},
	twitch_id: { type : String},
	mail_validated: { type: Boolean, default: false},
	banned: { type: Boolean, default: false},
	created_on: { type: Date, default: Date.now }
});

User.methods.login = function(password = false) { // Return True if user is allowed to login ( check if password is correct if necessary and check if user is banned etc... )
	if(this.mail_validated && !this.banned) {
		if(password) {
			return bcrypt.compareSync(password, this.password);
		}
		return true;
	}
};

User.methods.createToken = async function () {
	return new Promise((resolve, reject) => {
		var token = new Token({
			'user_id' : this._id
		}).save().then((token) => {
			if(token) {
				resolve(token);
			}
			reject('Something went wrong...');
		}).catch((err) => {
			reject('Something went wrong...');
		});
	});
}

module.exports = mongoose.model('User', User);