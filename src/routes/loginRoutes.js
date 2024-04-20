const express = require('express');
const loginRoutes = express();
const loginSchema = require('../schemas/loginSchema.js');
const validateRequestBody = require('../middlewares/validateRequestBody.js');
const { loginValidation, userAuthorization } = require('../middlewares/loginMiddleware.js');
const loginAuthenticationController = require('../controllers/loginController.js');

loginRoutes.post('/login',
    validateRequestBody(loginSchema),
    loginValidation,
    loginAuthenticationController
);

module.exports = loginRoutes;