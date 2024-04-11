const express = require('express');

const validateRequestBody = require('../middlewares/validateRequestBody.js');
const { userValidationSchema } = require('../schemas/loginSchema.js');

const userController = require('../controllers/userController.js')
const userMiddleware = require('../middlewares/userMiddeware.js');

const userRoutes = express();
userRoutes.post('/user', validateRequestBody(userValidationSchema), userController.createNewUser);
userRoutes.get('/user/:id', userMiddleware.validateUserId, userController.getUsersInfosById);

module.exports = userRoutes;