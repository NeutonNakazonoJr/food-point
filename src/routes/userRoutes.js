const express = require('express');

const validateRequestBody = require('../middlewares/validateRequestBody.js');

const userController = require('../controllers/userController.js')
const userMiddleware = require('../middlewares/userMiddleware.js');
const usersSchemas = require('../schemas/userSchema.js');

const userRoutes = express();

userRoutes.post('/user', 
    validateRequestBody(usersSchemas.userInsertSchema), 
    userMiddleware.validateUserEmail, 
    userController.createNewUser
);

userRoutes.use('/user/:id', userMiddleware.validateUserId);

userRoutes.get('/user/:id', userController.getUsersInfosById);

userRoutes.patch('/user/:id', 
    validateRequestBody(usersSchemas.userUpdateSchema),
    userMiddleware.validateUserEmail,
    userController.updateUsersInfos
);

userRoutes.put('/user/:id', 
    userMiddleware.validatePasswordUpdate,
    userController.updateUsersPassword
);

module.exports = userRoutes;