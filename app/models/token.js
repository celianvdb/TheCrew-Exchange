var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
var jwt = require('jsonwebtoken');
var config = require('../config.json');

var Token = new Schema({
	user_id : { type: ObjectId },
	expire_date : { type: Date, default: new Date(+new Date() + config.token_expiration)},
	enabled : { type: Boolean, default: true}
});

Token.methods.getToken = function() {
	var UUID = this.UUID;

	var token_content = {
		"_id" : this._id,
		"user_id" : this.user_id,
		"expire_date" : this.expire_date
	};
	var token = jwt.sign(token_content, config.token_secret);

	return token;
};

Token.methods.disableToken = async function() {
	this.enabled = false;
	await this.save();
}

module.exports = mongoose.model('Token', Token);