const express = require('express');

// Feature related route imports
const profile = require('./profile');

const router = express.Router();

// Adding all routes
router.use(profile);

module.exports = router;