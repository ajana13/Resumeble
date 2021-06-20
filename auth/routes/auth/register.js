const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');

// Load input validation
const validateRegisterInput = require("../../validation/register");

// Load User model
const User = require('../../models/User');

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/register', (req, res) => {

    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then((mongoUser) => {
        if (mongoUser) {
            return res.status(400).json({ email: 'Email already exists' });
        }
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        // Hash password before saving in database
        return bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then((user) => res.json(user))
                    // eslint-disable-next-line no-console
                    .catch((e) => console.log(e));
            });
        });
    });

    return res;
});

module.exports = router;
