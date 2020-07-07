'use strict';

const MONGOOSE = require('mongoose');
const AUTHCONTROLLER = require('../controller/AuthController');
const Freelancer = MONGOOSE.model('Freelancer');

module.exports = {
  async restoreAll(req, res) {
    try {
      let { page = 1 } = req.query; // paginate
      let freelancers = await Freelancer.paginate({}, { page, limit: 10, populate: 'user' }); // first object are filters, 10 per page
      return res.json(freelancers);
    } catch (err) {
      console.log(err)
      return res.status(400).send({error: "Could not restore freelancers."})
    }
  },

  async restore(req, res) {
    try {
      let freelancer = await Freelancer.findById(req.params.id).populate('user');
      return res.json(freelancer);
    } catch (err) {
      return res.status(400).send({Error: "Could not restore freelancer."})
    }
  },

  async insert(req, res) {
    try {
      
      let freelancer = await Freelancer.create({...req.body, user: req.userId});
      
      return res.json({
        freelancer
      });
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
    return res.json(freelancer);
    } catch(err) {
      return res.status(400).send({Error: "Could not update freelancer."})
    }
  },

  async remove(req, res) {
    try {
      await Freelancer.findByIdAndRemove(req.params.id);
      return res.send();
    } catch(err) {
      return res.status(400).send({Error: "Could not delete freelancer."})
    }
  },
};
