const express = require('express');
const router = require('express-promise-router')();
const userModel = require('../../models/user');
const config = require('../../config.json');
const authenticate = require('../../middlewares/auth/authenticate');
const authenticate_callback = require('../../middlewares/auth/authenticate_callback');
const logout = require('../../middlewares/auth/logout');

router.get('/twitch', authenticate);

router.get('/twitch/callback', authenticate_callback);

router.get('/logout', logout);

module.exports = router;