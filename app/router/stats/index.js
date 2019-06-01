const express = require('express');
const router = require('express-promise-router')();
const config = require('../../config.json');

router.get('*', (req, res, next) => {
	res.json('I\'m alive');
});

module.exports = router;