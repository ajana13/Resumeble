const express = require("express");

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

// Load input validation
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public

router.post("/login", (req, res) => {
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
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    return bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched, Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
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
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    });
  });
});

//  Input : email via body.
//  HTTP Success : 200 and message.
//  HTTP Errors : 400, 404, 500, 503.
/*
router.post("/login/forgot", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const { email } = req.body;
  

    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: 'Email not found' });
        }

    


    });

    



    User.findOne({ email: req.body.email }, function (err, user) {

      user.passwordResetToken = token.token;
      user.passwordResetExpires = moment().add(12, "hours");
  
      user.save(function (err) {
        if (err) {
          return res.status(500).send({ message: "An unexpected error occurred" });
        }
        // Save the token
        token.save(function (err) {
          if (err) {
            return res.status(500).send({ message: "An unexpected error occurred" });
          }
          // Send the mail
          const mail = {
            to: user.email,
            from: `${sendingEmail}`,
            subject: "Reset password link",
            text: "Some useless text",
            html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n
          <a href="http://${host}/login/reset/${token.token}">http://${host}/login/reset/${token.token}</a> \n\n If you did not request this, please ignore this email and your password will remain unchanged.\n </p>`,
          };
  
          sgMail
            .send(mail)
            .then(() => {
              return res
                .status(200)
                .send({ message: `A validation email has been sent to ${user.email}` });
            })
            .catch((error) => {
              winston.error(error);
              return res.status(503).send({
                message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
              });
            });
        });
      });
    });
  });
  */

module.exports = router;
