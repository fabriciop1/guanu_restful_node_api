'use strict';

const MONGOOSE = require('mongoose');
const User = MONGOOSE.model('User');
const FS = require('fs');
const PATH = require('path');
const { promisify } = require('util');

module.exports = {
  async insert(req, res) {
    if (!req.file) return res.status(400).send({ Error: 'Insert a photo.' });

    let { originalname: name, key, location: url = '' } = req.file;

    try {
      let user = await User.findById(req.params.id);
      if (user.profilePicture.url) {
        promisify(FS.unlink)(
          PATH.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', key) // this is needed because photo is inserted anyway
        );
        return res.status(400).send({
          Error: 'A photo was found. If you wanna change it, update it.',
        });
      }
      if (!url) {
        url = `${process.env.APP_URL}/files/${key}`;
      }
      user = await User.findByIdAndUpdate(
        req.params.id,
        {
          profilePicture: { name, url, key },
        },
        { new: true }
      );
      return res.json(user);
    } catch (err) {
      promisify(FS.unlink)(
        PATH.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', key) // this is needed because photo is inserted anyway
      );
      return res
        .status(400)
        .send({ Error: 'Could not insert profile picture.' });
    }
  },

  async update(req, res) {
    if (!req.file) return res.status(400).send({ Error: 'Insert a photo.' });

    let { originalname: name, key, url = '' } = req.file;

    try {
      let user = await User.findById(req.params.id);

      promisify(FS.unlink)(
        PATH.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'tmp',
          'uploads',
          user.profilePicture.key
        )
      );

      url = `${process.env.APP_URL}/files/${key}`;

      user = await User.findByIdAndUpdate(
        req.params.id,
        {
          profilePicture: { name, url, key },
        },
        { new: true }
      );

      return res.json(user);
    } catch (err) {
      promisify(FS.unlink)(
        PATH.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', key) // this is needed because photo is inserted anyway
      );
      return res
        .status(400)
        .send({ Error: 'Could not update profile picture.' });
    }
  },
};
