const express = require('express');
const router = require('express-promise-router')();
const userModel = require('../../models/user.js');
const config = require('../../config.json');
const security = require('../../models/security.js');

router.use('/:identifier*', (req, res, next) => { // UUID,username required for every request /:identifier/*

	var userIdentifier = {_id: req.params.identifier}
	
	if(!security.isUUID(req.params.identifier))
		userIdentifier = {'username': req.params.identifier}

	req.params.identifier = userModel.findOne(userIdentifier).then((user) => {
		if(user) {
			req.user = user;
			next();
			return;
		}
		res.errors(['User not found.']);
	});

});

router.get('/:identifier', (req, res) => {
	res.json(req.user);
});

router.get('/:identifier/avatar', (req, res) => {
	res.contentType('image/jpg');
	res.set("Content-Disposition", "inline;");
	res.sendFile(config.storage.avatars+req.user.UUID);
});

module.exports = router;