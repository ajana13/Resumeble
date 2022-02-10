const express = require('express');

// Feature related route imports
const login = require('./login');
const register = require('./register');
const emailVerification = require('./emailVerification');
const passwordReset = require('./passwordReset');

const router = express.Router();

// Adding all routes
router.use(login);
router.use(register);
router.use(emailVerification);
router.use(passwordReset);

module.exports = router;