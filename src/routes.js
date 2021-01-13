const routes = require('express').Router();

//controllers
const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

//Middlewares
const authMiddleware = require('./app/middlewares/authMiddlewares');

//user
routes.post('/store', UserController.store);
routes.post('/task', authMiddleware, (req, res) => res.send({ ok: "true"}));
routes.get('/', UserController.index);

//section
routes.post('/login', SessionController.login);
routes.put('/forgot_password', SessionController.forgotPassword);
routes.put('/forgot_password/reset_password', SessionController.resetPassword);



module.exports = routes;