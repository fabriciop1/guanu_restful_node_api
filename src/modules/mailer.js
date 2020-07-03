const NODEMAILER = require('nodemailer');
const HBS = require('nodemailer-express-handlebars');
const PATH = require('path');

let { host, port, user, pass } = require('../config/mail.json');

let transport = NODEMAILER.createTransport({
  host,
  port,
  auth: { user, pass },
});

transport.use(
  'compile',
  HBS({
    viewEngine: {
      extName: '.html',
      partialsDir: PATH.resolve('./src/resources/mail/'),
      layoutsDir: PATH.resolve('./src/resources/mail/'),
      defaultLayout: 'forgot_passwd.html',
    },
    viewPath: PATH.resolve('./src/resources/mail/'),
    extName: '.html',
  })
);

module.exports = transport;
