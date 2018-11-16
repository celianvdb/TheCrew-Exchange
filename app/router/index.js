const express = require('express');
const router = require('express-promise-router')();

const staticRouter = require('./static');
const userRouter = require('./user');
const authRouter = require('./auth');
const meRouter = require('./me');
const picsRouter = require('./pics');

// Set header as JSON 
router.use("*", (req, res, next) => {
    res.errors = (errors) => {
        res.json({ status : 'error', errors : errors })
    };
    next();
});

router.use("/", staticRouter);
router.use("/me", meRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/pics", picsRouter);

module.exports = router;