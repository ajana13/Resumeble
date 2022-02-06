const express = require('express');

// Feature related route imports
const login = require('./login');
const register = require('./register');

const router = express.Router();

// Adding all routes
router.use(login);
router.use(register);

module.exports = router;