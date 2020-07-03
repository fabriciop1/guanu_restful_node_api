'use strict';

const EXPRESS = require('express');
const ROUTES = EXPRESS.Router();

let authMiddleware = require('./app/middlewares/auth');
let FreelancerController = require('./app/controller/FreelancerController');
let AuthController = require('./app/controller/AuthController');
let CustomerController = require('./app/controller/CustomerController')

ROUTES.get('/freelancers', FreelancerController.restoreAll);
ROUTES.post('/freelancers', FreelancerController.insert);
ROUTES.get('/freelancers/:id', authMiddleware, FreelancerController.restore);
ROUTES.put('/freelancers/:id', authMiddleware, FreelancerController.update);
ROUTES.delete('/freelancers/:id', authMiddleware, FreelancerController.remove);

ROUTES.post('/auth', AuthController.authenticate);
ROUTES.post('/auth/forgot_password', AuthController.forgot_password);
ROUTES.post('/auth/reset_password', AuthController.reset_password);

ROUTES.get('/customers', CustomerController.restoreAll);
ROUTES.get('/customers/:id', authMiddleware, CustomerController.restore);
ROUTES.post('/customers', CustomerController.insert);
ROUTES.put('/customers/:id', authMiddleware, CustomerController.update);
ROUTES.delete('/customers/:id', authMiddleware, CustomerController.delete);

module.exports = ROUTES;
