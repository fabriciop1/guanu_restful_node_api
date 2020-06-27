"use strict"

const EXPRESS = require('express')
const ROUTES = EXPRESS.Router();

let FreelancerController = require('./controller/FreelancerController')

ROUTES.get('/freelancers', FreelancerController.restoreAll)
ROUTES.post('/freelancers', FreelancerController.insert)
ROUTES.get('/freelancers/:id', FreelancerController.restore)
ROUTES.put('/freelancers/:id', FreelancerController.update)
ROUTES.delete('/freelancers/:id', FreelancerController.remove)
ROUTES.post('/freelancers/auth', FreelancerController.authenticate)

module.exports = ROUTES