const express = require('express');

// Feature related route imports
const file = require('./file');

const router = express.Router();

// Adding all routes
router.use(profile);

module.exports = router;