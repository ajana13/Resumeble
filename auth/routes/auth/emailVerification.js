/* eslint-disable no-param-reassign */
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const User = require('../../models/User');
const MailModule = require('../../util/mail/mailModule');

const router = express.Router();

router.get('/verify/:code', (req, res) => {
  const { code } = req.params;
  try {
    return User.findOne({ verification_url_code: code }).then((user) => {
      if (!user) {
        return res.status(404).json({ err: `This link doesn't exist` });
      }
      // Update the values
      user.verified = true;
      user.verification_url_code = '';
      user.save();

      // Redirect to home
      return res.redirect('/');
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.status(404).json({ err: 'This link has become stale' });
  }
});

router.post('/verify', (req, res) => {
  const { email } = req.body;

  try {
    return User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(400).json({ err: `This user doesn't exist` });
      }
      // Generate unique code for reset url
      const uniqueCode = uuidv4();

      // Update the url code in DB
      user.verification_url_code = uniqueCode;
      user.save();

      // Send the user an email
      const msg = new MailModule(
        email,
        'Resumeble Email Verification',
        `Hello ${user.name}, thank's for....`, // Preview Text
        `<p>Hello ${user.name}, thank's for creating a Resumeble Account</p>
        <br />
        <p>You can verify your email by using this link: <a href=http://localhost/auth/verify/${uniqueCode}>http://localhost/auth/verify/${uniqueCode}</a></p>
        <br />
        <p>Best,</p>
        <p>Resumeble</p>`
      );
      msg.send();

      return res.status(200).send('Success');
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return res.send(err);
  }
});

module.exports = router;