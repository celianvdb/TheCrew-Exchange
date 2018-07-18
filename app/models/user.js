var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
var Schema = mongoose.Schema;

var User = new Schema({
	username: { type : String},
	mail: { type : String},
	uplay: { type : String},
	twitch_id: { type : String},
	password: { type : String},
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

User.plugin(findOrCreate);

module.exports = mongoose.model('User', User);