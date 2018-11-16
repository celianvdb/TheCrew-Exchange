const express = require('express');
const router = require('express-promise-router')();
const config = require('../../config.json');
const isLogged = require('../../middlewares/auth/isLogged.js');

router.get('/upload', isLogged, (req , res, next) => {
	
})

module.exports = router;