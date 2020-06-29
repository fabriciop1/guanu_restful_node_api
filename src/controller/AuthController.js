"use strict"

const MONGOOSE = require('mongoose')
const BCRYPT = require('bcryptjs')
const JWT = require('jsonwebtoken')
const AUTHCONFIG  = require('../config/auth.json')
const Freelancer = MONGOOSE.model("Freelancer")

module.exports = {
  async authenticate(req, res) {
    let { email, password } = req.body
    let freelancer = await Freelancer.findOne({ email }).select('+password')

    if (!freelancer) {
      return res.status(400).send({Error: 'User not found.'})
    }

    if(!await BCRYPT.compare(password, freelancer.password)) {
      return res.status(400).send({Error: 'Invalid password.'})
    }

    freelancer.password = undefined

    res.json({
      freelancer, 
      token: generateToken({id: freelancer.id})
    })
  }
}

function generateToken(params = {}) {
  return JWT.sign(params, AUTHCONFIG.secret, {expiresIn: 86400})
}