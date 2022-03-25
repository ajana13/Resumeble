/* eslint-disable no-param-reassign */
const express = require('express');
const bcrypt = require('bcryptjs');
// const { v4: uuidv4 } = require('uuid');
const { uuid } = require('uuidv4');
const User = require('../../models/User');
const MailModule = require('../../util/mail/mailModule');

const path = require('path');
const multer = require('multer');
require('dotenv').config();
// require('dotenv').config({ path: path.resolve(__dirname, '../../config/.env') });

const router = express.Router();

const port = process.env.PORT || 5000;

// Route to extract the code and show user a page to update their password
router.get('/password_reset/:code', (req, res) => {
  const { code } = req.params;
  try {
    return User.findOne({ password_reset_url_code: code }).then((user) => {
      if (!user) {
        return res.status(404).json({ err: `This link doesn't exist` });
      }
      // TODO: Show a landing page for password resets
      return res.redirect('/resetpassword');
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(404).json({ err: 'This link has become stale' });
  }
});

// The route used to kickoff a password reset process
router.post('/password_reset', (req, res) => {
  const { email } = req.body;
  // console.log(email);
  // return res.status(200).send('Success');
  try {
    return User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({ err: `This user doesn't exist` });
      }
      // Generate unique code for reset url
      const uniqueCode = uuid();
      // Update the url code in DB
      user.password_reset_url_code = uniqueCode;
      user.save();

      // Send the user an email
      const msg = new MailModule(
        email,
        'BUILD UMass Password Reset',
        `Hello ${user.name}, your password....`, // Preview Text
        `<p>Hello ${user.name}, your password can be reset by visiting the following link:</p>
        <br />
        <p><a href=http://localhost/auth/password_reset/${uniqueCode}>http://localhost/auth/password_reset/${uniqueCode}</a></p>
        <br />
        <p>Best,</p>
        <p>Resumeble</p>`
      );
      msg.send();

      console.log("hi");
      return res.status(200).send('Success');
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.send(err);
  }
});

// Route to update the password of a user
router.post("/reset_new_password", (req, res) => {
  const { email, password, secondPassword } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ err: `This user doesn't exist` });
    }

    if(password != secondPassword) {
      return res.status(400).json({ err: `Passwords don't match` });
    }

    // Check if old password is correct
    if(user.password_reset_url_code != "") {
        user.password = password;
        user.password_reset_url_code = "";
        return bcrypt.genSalt(10, (error, salt) => {
          bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            user.password = hash;
            user
              .save()
              .then((userRef) => res.json(userRef.id))
              // eslint-disable-next-line no-console
              .catch((e) => console.log(e));
          });
        });
      }
  });
});

module.exports = router;