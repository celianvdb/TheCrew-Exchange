const express = require('express');
const router = require('express-promise-router')();
const config = require('../../config.json');
const isLogged = require('../../middlewares/auth/isLogged.js');

router.post('/upload', /*isLogged, */(req , res, next) => { //isLogged ByPass temporary for dev reasons
	console.log(req.params);
});

module.exports = router;