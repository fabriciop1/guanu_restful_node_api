'use strict';

const MONGOOSE = require('mongoose');
const BCRYPT = require('bcryptjs');
const JWT = require('jsonwebtoken');
const AUTHCONFIG = require('../../config/auth.json');
const CRYPTO = require('crypto');
const MAILER = require('../../modules/mailer');
const Freelancer = MONGOOSE.model('Freelancer');

module.exports = {
  async authenticate(req, res) {
    let { email, password } = req.body;
    let freelancer = await Freelancer.findOne({ email }).select('+password');

    if (!freelancer) {
      return res.status(400).send({ Error: 'User not found.' });
    }

    if (!(await BCRYPT.compare(password, freelancer.password))) {
      return res.status(400).send({ Error: 'Invalid password.' });
    }

    freelancer.password = undefined;

    res.json({
      freelancer,
      token: module.exports.generateToken({ id: freelancer.id }),
    });
  },

  async forgot_password(req, res) {
    let { email } = req.body;

    try {
      let freelancer = await Freelancer.findOne({ email });

      if (!freelancer) {
        return res.status(400).send({ error: 'User not found.' });
      }

      let token = CRYPTO.randomBytes(20).toString('hex');
      let dateNow = new Date();
      dateNow.setHours(dateNow.getHours() + 1);

      await Freelancer.findByIdAndUpdate(
        freelancer.id,
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
      let freelancer = await Freelancer.findOne({ email }).select(
        '+passwordResetToken passwordResetExpires'
      );

      if (!freelancer) {
        return res.status(400).send({ error: 'User not found.' });
      }

      if (token !== freelancer.passwordResetToken) {
        return res.status(400).send({ error: 'Invalid token.' });
      }

      let now = new Date();

      if (now > freelancer.passwordResetExpires) {
        return res
          .status(400)
          .send({ error: 'Token expired. Generate a new one.' });
      }

      freelancer.password = password;

      await freelancer.save();

      res.send();
    } catch (err) {
      return res.status(400).send({ error: 'Error resetting password.' });
    }
  },

  generateToken(params = {}) {
    return JWT.sign(params, AUTHCONFIG.secret, { expiresIn: 86400 });
  },
};
