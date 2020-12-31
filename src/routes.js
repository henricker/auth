const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');

routes.post('/auth/register', UserController.createUser);
routes.post('/auth/authenticate', UserController.authenticateUser);

module.exports = routes;