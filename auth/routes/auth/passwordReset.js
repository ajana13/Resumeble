/* eslint-disable no-param-reassign */
const express = require('express');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../../models/User');
const MailModule = require('../../util/mails/mailModule');

const router = express.Router();

// Route to extract the code and show user a page to update their password
router.get('/password_reset/:code', (req, res) => {
  const { code } = req.params;
  try {
    return User.findOne({ password_reset_url_code: code }).then((user) => {
      if (!user) {
        return res.status(404).json({ err: `This link doesn't exist` });
      }

      // TODO: Show a landing page for password resets
      return res.redirect('/');
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
  try {
    return User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({ err: `This user doesn't exist` });
      }
      // Generate unique code for reset url
      const uniqueCode = uuidv4();

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
        <p><a href=http://localhost:5000/auth/password_reset/${uniqueCode}>http://localhost:5000/auth/password_reset/${uniqueCode}</a></p>
        <br />
        <p>Best,</p>
        <p>BUILD UMass</p>`
      );
      msg.send();

      return res.status(200).send('Success');
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    return res.send(err);
  }
});

// Route to update the password of a user
router.patch('/password_reset', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ err: `This user doesn't exist` });
    }
    // Check if old password is correct
    return bcrypt.compare(oldPassword, user.password).then((isMatch) => {
      if (isMatch) {
        user.password = newPassword;
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
      return res.status(400).json({ err: `Incorrect password` });
    });
  });
});

module.exports = router;