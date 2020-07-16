'use strict';

const express = require('express');
const requireDir = require('require-dir');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

// Starting App
const app = express();
app.use(express.json()); // Allow creating JSON POST
app.use(express.urlencoded({ extended: true })); // photo management
app.use(morgan('dev'));
app.use(cors()); // allow access from the origin
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

require('dotenv').config();
requireDir('app/model'); // import all files in model/

// Routes
app.use('/api', require('./routes'));

app.listen(process.env.APP_PORT);
