'use strict';

const MONGOOSE = require('../../database');
const PAGINATE = require('mongoose-paginate-v2');

let freelancerSchema = new MONGOOSE.Schema({
  description: {
    type: String,
    required: true,
  },
  services: {
    type: Array,
    required: true,
    default: [],
  },
  user: {
    type: MONGOOSE.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

freelancerSchema.plugin(PAGINATE);

let freelancer = MONGOOSE.model('Freelancer', freelancerSchema);

module.exports = freelancer;
