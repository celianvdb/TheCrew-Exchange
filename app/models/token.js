var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId
var jwt = require('jsonwebtoken');
var config = require('../config.json');

var Token = new Schema({
	user_id : { type: ObjectId },
	type: { type: Boolean }, // 0 = Access ; 1 = Refresh
	pair_id : { type: ObjectId },
	expire_date : { type: Date },
	enabled : { type: Boolean, default: true}
});

Token.pre('save', function(next) {
	if (this.type === false) {
		this.expire_date = new Date(+new Date() + config.token_access_expiration);
	} else {
		this.expire_date = new Date(+new Date() + config.token_refresh_expiration);
	}

	next();
});

Token.methods.tokenStatus = function() { // 0 => disabled, 1 => valid, 2 => expired
	var now = new Date();

	if(!this.enabled)
		return 0;

	if(now > this.expire_date) {
		return 2;
	}

	return 1;
}

Token.methods.getToken = function() {
	var UUID = this.UUID;
	
	var token_content = {
		"_id" : this._id,
		"user_id" : this.user_id,
		"type" : this.type,
		"pair_id" : this.pair_id,
		"expire_date" : this.expire_date
	};
	var token = jwt.sign(token_content, config.token_secret);

	return token;
};

Token.methods.disableToken = async function() {
	this.enabled = false;
	await this.save();
}

Token.statics.getTokenFromJWT = async function(JWT) {
	if(!JWT)
		return;

	try {
		JWT = jwt.verify(JWT, config.token_secret);
	} catch {
		return;
	}
	return this.findOne({ '_id' : JWT._id })
}

module.exports = mongoose.model('Token', Token);