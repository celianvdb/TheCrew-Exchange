const express = require('express');
const router = require('express-promise-router')();
const userModel = require('../../models/user');
const config = require('../../config.json');
const authenticate = require('../../middlewares/auth/authenticate');
const authenticate_callback = require('../../middlewares/auth/authenticate_callback');
const token = require('../../models/token');
const tokensPair = require('../../models/tokensPair');
const logout = require('../../middlewares/auth/logout');

router.get('/twitch', authenticate);

router.get('/twitch/callback', authenticate_callback);

router.get('/logout', logout);

router.get('/getToken', async function(req, res, next) {
	if(req.query.refresh_token) {

		var tokens = new tokensPair();
		var refresh_token = await token.getTokenFromJWT(req.query.refresh_token);

		if(refresh_token && refresh_token.type){ // Check if the token exist and if it's really a refresh token
			
			await tokens.findPair(refresh_token._id);
			
			if(tokens.refresh_token.tokenStatus() === 1){ // Check if the token status is good
				
				tokens.access_token.disableToken();
				tokens.refresh_token.disableToken();
				await tokens.generate(tokens.refresh_token.user_id);
				
				return res.json({
					"status" : 'Success',
					"access_token" : tokens.access_token.getToken(),
					"refresh_token" : tokens.refresh_token.getToken()
				});
			}

		}
		return res.errors(['Invalid refresh token.']);
	}
	return res.errors(['Please provide a refresh token.']);
});

module.exports = router;