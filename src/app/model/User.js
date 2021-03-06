'use strict';

const MONGOOSE = require('../../database');
const PAGINATE = require('mongoose-paginate-v2');
const BCRYPT = require('bcryptjs');
const FS = require('fs');
const PATH = require('path');
const { promisify } = require('util');

let userSchema = new MONGOOSE.Schema({
  name: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  cpf: {
    type: Number,
    unique: true,
    require: true,
  },
  birthday: {
    type: Date,
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
    type: Number,
    required: true,
  },
  profilePicture: {
    name: String,
    url: String,
    key: String,
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

userSchema.pre('save', async function (next) {
  let hash = await BCRYPT.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.pre('remove', function (next) {
  if (process.env.STORAGE_TYPE === 'local' && this.profilePicture.url) {
    promisify(FS.unlink)(
      PATH.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'tmp',
        'uploads',
        this.profilePicture.key
      )
    );
  }
  next();
});

userSchema.plugin(PAGINATE);

let user = MONGOOSE.model('User', userSchema);

module.exports = user;
