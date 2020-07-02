"use strict"

const EXPRESS = require('express')
const ROUTES = EXPRESS.Router();

let authMiddleware = require('./app/middlewares/auth')
let FreelancerController = require('./app/controller/FreelancerController')
let AuthController = require('./app/controller/AuthController')

ROUTES.get('/freelancers', FreelancerController.restoreAll)
ROUTES.post('/freelancers', FreelancerController.insert)
ROUTES.get('/freelancers/:id', authMiddleware, FreelancerController.restore)
ROUTES.put('/freelancers/:id', authMiddleware, FreelancerController.update)
ROUTES.delete('/freelancers/:id', authMiddleware, FreelancerController.remove)

ROUTES.post('/freelancers/auth', AuthController.authenticate)
ROUTES.post('/freelancers/auth/forgot_password', AuthController.forgot_password)
ROUTES.post('/freelancers/auth/reset_password', AuthController.reset_password)

module.exports = ROUTES