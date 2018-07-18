const express = require('express');
const router = require('express-promise-router')();

const staticRouter = require('./static');
const userRouter = require('./user');
const authRouter = require('./auth');
const meRouter = require('./me');

// Set header as JSON 
router.use("*", (req, res, next) => {
    res.errors = (errors) => {
        res.json({ errors : errors })
    };
    next();
});

router.use("/", staticRouter);
router.use("/me", meRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;