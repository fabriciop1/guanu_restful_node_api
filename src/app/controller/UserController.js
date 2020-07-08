'use strict';

const MONGOOSE = require('mongoose');
const AUTHCONTROLLER = require('../controller/AuthController');
const User = MONGOOSE.model('User');

module.exports = {
  async restoreAll(req, res) {
    try {
      let { page = 1 } = req.query; // paginate
      let users = await User.paginate({}, { page, limit: 10 }); // no filters, 10 per page
      return res.json(users);
    } catch (err) {
      return res.status(400).send({ Error: 'Could not restore all users.' });
    }
  },

  async restore(req, res) {
    try {
      let user = await User.findById(req.params.id);
      return res.json(user);
    } catch (err) {
      return res.status(400).send('Could not restore user.');
    }
  },

  async insert(req, res) {
    let { email } = req.body;

    try {
      if (await User.findOne({ email })) {
        return res.status(400).send({ Error: 'User already exists.' });
      }

      let user = await User.create(req.body);
      user.password = undefined;

      return res.json({
        user,
        token: AUTHCONTROLLER.generateToken({ id: user.id }),
      });
    } catch (err) {
      return res.status(400).send({ Error: 'Registration failed.' });
    }
  },

  async update(req, res) {
    try {
      let user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json(user);
    } catch (err) {
      return res.status(400).send({ Error: 'Failed to update user.' });
    }
  },

  async remove(req, res) {
    try {
      await User.findByIdAndRemove(req.params.id);
      return res.send();
    } catch (err) {
      return res.status(400).send({ Error: 'Could not remove user.' });
    }
  },
};
