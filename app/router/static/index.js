const express = require('express');
const router = require('express-promise-router')();
const path = require("path");

let staticPath = path.resolve('app/public/api');

router.get('/', (req, res) => {
    res.sendFile('/index.html', { root: staticPath });
});

module.exports = router;