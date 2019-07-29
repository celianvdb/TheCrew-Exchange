const express = require('express');
const router = require('express-promise-router')();
const userModel = require('../../models/user.js');
const config = require('../../config.json');
/*
router.get('*', (req, res, next) => {
	res.json('me');
});*/

router.get('/settings', (req , res, next) => {
	res.json('settings page !! TADA !!! VICTORY!!!');
})

module.exports = router;