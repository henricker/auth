const express = require('express');
const routes = express.Router();
const UserController = require('./controllers/UserController');
const authMiddleware = require('./middlewaers/auth');

//Routes user
routes.post('/auth/register', UserController.createUser);
routes.post('/auth/authenticate', UserController.authenticateUser);

//Routes authenticate
routes.get('/project', authMiddleware, (request, response) => response.send({ok: true, userId: request.userId}));

module.exports = routes;