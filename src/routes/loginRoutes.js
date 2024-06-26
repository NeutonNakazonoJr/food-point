const express = require('express');
const loginRoutes = express();
const loginSchema = require('../schemas/loginSchema.js');
const validateRequestBody = require('../middlewares/validateRequestBody.js');
const { loginValidation } = require('../middlewares/loginMiddleware.js');
const loginAuthenticationController = require('../controllers/loginController.js');
const logout = require('../middlewares/logoutMiddleware.js');

loginRoutes.post('/logout', logout)
loginRoutes.post('/login',
    validateRequestBody(loginSchema),
    loginValidation,
    loginAuthenticationController
);

module.exports = loginRoutes;