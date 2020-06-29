"use strict"

const EXPRESS = require('express')
const ROUTES = EXPRESS.Router();

let authMiddleware = require('./middlewares/auth')
let FreelancerController = require('./controller/FreelancerController')
let AuthController = require('./controller/AuthController')

ROUTES.get('/freelancers', FreelancerController.restoreAll)
ROUTES.post('/freelancers', FreelancerController.insert)
ROUTES.get('/freelancers/:id', authMiddleware, FreelancerController.restore)
ROUTES.put('/freelancers/:id', authMiddleware, FreelancerController.update)
ROUTES.delete('/freelancers/:id', authMiddleware, FreelancerController.remove)
ROUTES.post('/freelancers/auth', AuthController.authenticate)

module.exports = ROUTES