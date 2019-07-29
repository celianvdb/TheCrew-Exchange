const crypto = require('crypto');
const mongoose = require('mongoose');
const Service = require('../services/index.js');
const config = require('../config.json');
const mail = Service.mail.client;

var Schema = mongoose.Schema;

var User = new Schema({
	username: { type : String },
	email: { type : String },
	password : { type : String },
	salt : { type : String },
	uplay_username: { type : String },
	uplay_id : { type : String },
	summit_notification_ps4 : { type : Boolean, default: false },
	summit_notification_x1 : { type : Boolean, default: false },
	summit_notification_pc : { type : Boolean, default: false },
	twitch_id: { type : String },
	validation_code: { type : String },
	mail_validated: { type: Boolean, default: false },
	banned: { type: Boolean, default: false },
	created_on: { type: Date, default: Date.now }
});

User.methods.isPasswordValid = function(password) {
	return crypto.scryptSync(password, this.salt, 64) == this.password;
};

User.methods.generatePassword = function(password) {
	this.salt = Math.random().toString(36).substring(2, 15);
	this.password = crypto.scryptSync(password, this.salt, 64);
};

User.methods.sendValidationMail = function() {
	//Generate a validation code
	this.validation_code = Math.random().toString(36).substring(2, 15);
	return mail.sendMail({
		"from": 'TheCrew Exchange <contact@thecrew-exchange.com>', // sender address
	    "to": this.email, // list of receivers
	    "subject": "Account validation", // Subject line
		"text": config.mail_messages.account_validation.replace('$Verification Link$', this.validation_code)
	});
};

module.exports = mongoose.model('User', User);