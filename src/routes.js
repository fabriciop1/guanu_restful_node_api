'use strict';

const EXPRESS = require('express');
const ROUTES = EXPRESS.Router();
const MULTER = require('multer');
const MULTERCONFIG = require('./config/multer');

let authMiddleware = require('./app/middlewares/auth');
let freelancerController = require('./app/controller/FreelancerController');
let authController = require('./app/controller/AuthController');
let userController = require('./app/controller/UserController');
let photoController = require('./app/controller/PhotoController');

ROUTES.get('/freelancers', freelancerController.restoreAll);
ROUTES.post('/freelancers', authMiddleware, freelancerController.insert);
ROUTES.get('/freelancers/:id', authMiddleware, freelancerController.restore);
ROUTES.put('/freelancers/:id', authMiddleware, freelancerController.update);
ROUTES.delete('/freelancers/:id', authMiddleware, freelancerController.remove);
ROUTES.get(
  '/freelancers/service/:service',
  authMiddleware,
  freelancerController.restoreByService
);

ROUTES.post('/auth', authController.authenticate);
ROUTES.post('/auth/forgot_password', authController.forgot_password);
ROUTES.post('/auth/reset_password', authController.reset_password);

ROUTES.get('/users', userController.restoreAll);
ROUTES.get('/users/:id', authMiddleware, userController.restore);
ROUTES.post('/users', userController.insert);
ROUTES.put('/users/:id', authMiddleware, userController.update);
ROUTES.delete('/users/:id', authMiddleware, userController.remove);

ROUTES.put(
  '/users/photo/:id',
  MULTER(MULTERCONFIG).single('file'),
  authMiddleware,
  photoController.insert
);
ROUTES.put(
  '/users/photo/update/:id',
  MULTER(MULTERCONFIG).single('file'),
  authMiddleware,
  photoController.update
);

module.exports = ROUTES;
