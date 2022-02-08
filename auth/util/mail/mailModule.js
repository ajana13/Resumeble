const sendGrid = require('@sendgrid/mail');
const path = require('path');
const { isEmailValid } = require('./mailUtils');
require('dotenv').config({
  path: path.resolve(__dirname, './config/.env'),
});

class MailModule {
  constructor(recipientEmail, subject = '', previewText = '', bodyHTML = '') {
    this.to = recipientEmail;
    this.from = 'resumeblecompany@gmail.com';
    this.subject = subject;
    this.text = previewText;
    this.html = bodyHTML;
  }

  editSubject(subject) {
    this.subject = subject;
  }

  editText(text) {
    this.text = text;
  }

  editHTML(html) {
    this.html = html;
  }

  send() {
    if (this.subject === '' || this.text === '' || this.html === '') {
      throw new Error('Email must have a subject, previewText, and bodyHTML!');
    } else {
      // Validate recipientEmail (a.k.a 'to')
      if (!isEmailValid(this.to)) {
        throw new Error('recipientEmail is invalid!');
      }

      // Initialize SendGrid
      this.sendGridMail = sendGrid;
      this.sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

      // Send Email
      this.sendGridMail
        .send(this)
        .then(() => {
          return true;
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
  }
}

module.exports = MailModule;