"use strict"

const MONGOOSE = require('../database')
const PAGINATE = require ("mongoose-paginate")
const BCRYPT = require('bcryptjs')

let freelancerSchema = new MONGOOSE.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: {
        type: String,
        required: true
    },
    profilePictureURL: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        default: Date.now
    }
})

freelancerSchema.pre('save', async function(next) {
    let hash = await BCRYPT.hash(this.password, 10)
    this.password = hash

    next()
})

freelancerSchema.plugin(PAGINATE)

let freelancer = MONGOOSE.model("Freelancer", freelancerSchema)

module.exports = freelancer