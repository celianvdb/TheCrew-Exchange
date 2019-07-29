const express = require('express');
const router = require('express-promise-router')();
const User = require('../../models/user');
const config = require('../../config.json');

router.post('/register', function(req, res, next) {
	if(req.body.username && req.body.email && req.body.password) {
	
		// Check if input data are valid

		var errors = [];

		if(!req.body.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
			errors.push('Invalid email.');
		if(!req.body.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) // Minimum eight characters, at least one letter and one number
			errors.push('Invalid password, you need a password that have a minimum of eight characters, at least one letter and one number.');

		if(errors.length > 0) {
			res.errors(errors);
			return;
		}

		// Check if email and username exists

		const usernameCheck = User.findOne({'username' : req.body.username}).exec();
		const emailCheck = User.findOne({'email' : req.body.email}).exec();

		Promise.all([usernameCheck, emailCheck])
			.then((existanceTests) => {

				errors = [];

				if(existanceTests[0]) {
					errors.push('Username already used.');
				}
				
				if(existanceTests[1])
					errors.push('Email already used.');

				if(errors.length > 0) {
					res.errors(errors);
					return;
				}

				//Create user ...

				var user = new User({ 'username' : req.body.username, 'email' : req.body.email });
				user.generatePassword(req.body.password);
				user.save();
				user.sendValidationMail().then(() => {

					res.success(['Account created, please check your mailbox to validate it.']);
					return;
					
				}).catch((err) => {

					console.log(err);
					res.errors(['An error occured, please contact celian@thecrew-exchange.com']);
					return;

				});

			})
			.catch((err) => {
				console.log(err);
				res.errors(['An error occured, please contact celian@thecrew-exchange.com']);
				return;
			});
	}
	else {
		res.errors(['Username, email and password are required to perform your register.']);
		return;
	}
});

router.post('/validation', function(req, res, next) {
	if(req.body.code) {
		User.findOne({'validation_code' : req.body.code}).exec().then((user) => {
			if(user) {
				user.mail_validated = true;
				user.validation_code = "";
				user.save().then(() => {
					res.success(['Account validated !']);
				})
			}else {
				res.errors(['Invalid code.']);
			}
		})
	}
	else {
		res.errors(['Validation code is required.']);
		return;
	}
});

router.post('/forgotPassword', function(req, res, next) {

});

router.post('/login', function(req, res, next) {
	if(req.body.username && req.body.password) {
		User.findOne({'username' : req.body.username}).exec().then((user) => {
			if(!user) {
				res.errors(['Invalid credentials.']);
				return;
			}
			if(!user.isPasswordValid(req.body.password)) {
				res.errors(['Invalid credentials.']);
				return;
			}

			if(user.banned) {
				res.errors(['This account is banned.']);
				return;
			}

			if(user.mail_validated) {
				res.errors(['You need to validate your email to be able to login.']);
				return;
			}

			// JWT generation
			

		});
	}
	else {
		res.errors(['Username and password are required to login.']);
		return;
	}
});

module.exports = router;