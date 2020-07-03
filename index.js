'use strict';

const express = require('express');
const requireDir = require('require-dir');
const cors = require('cors');

// Starting App
const app = express();
app.use(express.json()); // Allow creating JSON POST
app.use(cors()); // allow access from the origin

require('dotenv').config();
requireDir('./src/app/model'); // import all files in model/

// Routes
app.use('/api', require('./src/routes'));

app.listen(process.env.APP_PORT);
