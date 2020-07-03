'use strict';

const MONGOOSE = require('../../database');
const BCRYPT = require('bcryptjs');

let customerSchema = new MONGOOSE.Schema({
  address: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },
  profilePictureURL: {
    type: String,
    required: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

customerSchema.pre('save', async function (next) {
  let hash = await BCRYPT.hash(this.password, 10);
  this.password = hash;

  next();
});

let customer = MONGOOSE.model('Customer', customerSchema);

module.exports = customer;
