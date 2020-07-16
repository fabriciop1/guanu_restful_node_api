'use strict';

const MONGOOSE = require('mongoose');
const Freelancer = MONGOOSE.model('Freelancer');
const User = MONGOOSE.model('User');

module.exports = {
  async restoreAll(req, res) {
    try {
      let { page = 1 } = req.query; // paginate
      let freelancers = await Freelancer.paginate(
        {}, // filters
        { page, limit: 10, populate: 'user' } // 10 per page
      );
      return res.json(freelancers);
    } catch (err) {
      console.log(err);
      return res.status(400).send({ error: 'Could not restore freelancers.' });
    }
  },

  async restore(req, res) {
    try {
      let freelancer = await Freelancer.findById(req.params.id).populate(
        'user'
      );
      if (!freelancer)
        return res.status(404).send({ Error: 'Freelancer not found.' });
      return res.json(freelancer);
    } catch (err) {
      return res.status(400).send({ Error: 'Could not restore freelancer.' });
    }
  },

  async restoreByService(req, res) {
    try {
      let freelancers = await Freelancer.find({
        services: { $regex: req.params.service, $options: 'i' },
      }).populate('user');
      return res.json(freelancers);
    } catch (err) {
      return res
        .status(400)
        .send({ Error: 'Could not restore freelancer by service.' });
    }
  },

  async insert(req, res) {
    if (!(await User.findById(req.userId))) {
      return res.status(400).send({ Error: 'Log in first.' });
    }

    try {
      let freelancer = await Freelancer.create({
        ...req.body,
        user: req.userId,
      });
      return res.json({ freelancer });
    } catch (err) {
      return res.status(400).send({ Error: 'Registration failed.' });
    }
  },

  async update(req, res) {
    try {
      let freelancer = await Freelancer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('user');
      if (!freelancer)
        return res.status(404).send({ Error: 'Freelancer not found.' });
      return res.json(freelancer);
    } catch (err) {
      return res.status(400).send({ Error: 'Could not update freelancer.' });
    }
  },

  async remove(req, res) {
    try {
      await Freelancer.findByIdAndRemove(req.params.id);
      return res.send();
    } catch (err) {
      return res.status(400).send({ Error: 'Could not delete freelancer.' });
    }
  },
};
