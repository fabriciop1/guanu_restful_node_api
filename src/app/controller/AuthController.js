'use strict';

const MONGOOSE = require('mongoose');
const BCRYPT = require('bcryptjs');
const JWT = require('jsonwebtoken');
const AUTHCONFIG = require('../../config/auth.json');
const CRYPTO = require('crypto');
const MAILER = require('../../modules/mailer');
const User = MONGOOSE.model('User');

module.exports = {
  async authenticate(req, res) {
    let { email, password } = req.body;
    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).send({ Error: 'User not found.' });
    }

    if (!(await BCRYPT.compare(password, user.password))) {
      return res.status(400).send({ Error: 'Invalid password.' });
    }

    user.password = undefined;

    res.json({
      user,
      token: module.exports.generateToken({ id: user.id }),
    });
  },

  async forgot_password(req, res) {
    let { email } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({ error: 'User not found.' });
      }

      let token = CRYPTO.randomBytes(20).toString('hex');
      let dateNow = new Date();
      dateNow.setHours(dateNow.getHours() + 1);

      await User.findByIdAndUpdate(
        user.id,
        {
          $set: {
            passwordResetToken: token,
            passwordResetExpires: dateNow,
          },
        },
        { new: true }
      );

      MAILER.sendMail(
        {
          to: email,
          from: 'fabriciopaes@gmail.com',
          template: 'forgot_passwd',
          context: { token },
        },
        (err) => {
          if (err) {
            return res.status(400).send({ error: 'Could not send email' });
          }
          return res.send();
        }
      );
    } catch (err) {
      return res
        .status(400)
        .send({ error: 'Error on forgot password. Try again.' });
    }
  },

  async reset_password(req, res) {
    let { email, token, password } = req.body;

    try {
      let user = await User.findOne({ email }).select(
        '+passwordResetToken passwordResetExpires'
      );

      if (!user) {
        return res.status(400).send({ error: 'User not found.' });
      }

      if (token !== user.passwordResetToken) {
        return res.status(400).send({ error: 'Invalid token.' });
      }

      let now = new Date();

      if (now > user.passwordResetExpires) {
        return res
          .status(400)
          .send({ error: 'Token expired. Generate a new one.' });
      }

      user.password = password;

      await user.save();

      res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Error resetting password.' });
    }
  },

  generateToken(params = {}) {
    return JWT.sign(params, AUTHCONFIG.secret, { expiresIn: 86400 });
  },
};
