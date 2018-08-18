var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var TokensPair = require('./tokensPair.js');

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

User.methods.createTokensPair = async function () {
	var tokens = new TokensPair();
	await tokens.generate(this._id);
	return tokens;
}

module.exports = mongoose.model('User', User);