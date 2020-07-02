"use strict"

const MONGOOSE = require('mongoose')
const AUTHCONTROLLER = require('../controller/AuthController')
const Freelancer = MONGOOSE.model("Freelancer")

module.exports = {
  async restoreAll(req, res) {
    let { page = 1 } = req.query // paginate 
    let freelancers = await Freelancer.paginate({}, { page, limit: 10 }) // first object are filters, 10 per page
    return res.json(freelancers)
  },

  async restore(req, res) {
    let freelancer = await Freelancer.findById(req.params.id)
    return res.json(freelancer)
  },

  async insert(req, res) {
    let { email } = req.body

    try {
      if (await Freelancer.findOne({ email })) {
        return res.status(400).send({Error: 'User already exists.'})
      } 
      
      let freelancer = await Freelancer.create(req.body)
      freelancer.password = undefined
      
      return res.json({freelancer, token: AUTHCONTROLLER.generateToken({id: freelancer.id})})
    } catch (err) {
      console.log(err)
      return res.status(400).send({Error: 'Registration failed.' })
    }
  },

  async update(req, res) {
    let freelancer = await Freelancer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    return res.json(freelancer)
  },

  async remove(req, res) {
    await Freelancer.findByIdAndRemove(req.params.id)
    return res.send()
  }
}
