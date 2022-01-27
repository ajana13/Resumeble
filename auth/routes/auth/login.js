const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

// Load input validation
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require('../../models/User');

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post('/login', (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email, password } = req.body;

    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }

        // Check password
        return bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User matched, Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };

                // Sign token
                const token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 31556926, // 1 year in seconds
                });
                jwt.verify(token, process.env.SECRET);
                return res.json({
                    success: true,
                    token: `bearer ${token}`,
                });
            }
            return res.status(400).json({ passwordincorrect: 'Password incorrect' });
        });
    });
});

module.exports = router;
