const express = require('express');

const validateRequestBody = require('../middlewares/validateRequestBody.js');

const userController = require('../controllers/userController.js')
const userMiddleware = require('../middlewares/userMiddleware.js');
const usersSchemas = require('../schemas/userSchema.js');
const { userAuthorization } = require('../middlewares/loginMiddleware.js')

const userRoutes = express();

userRoutes.post('/user', 
    validateRequestBody(usersSchemas.userInsertSchema), 
    userMiddleware.validateUserEmail, 
    userController.createNewUser
);

userRoutes.use(userAuthorization);
userRoutes.use('/user', userMiddleware.validateUserId);

userRoutes.get('/user', userController.getUsersInfosById);

userRoutes.patch('/user', 
    validateRequestBody(usersSchemas.userUpdateSchema),
    userMiddleware.validateUserEmail,
    userController.updateUsersInfos
);

userRoutes.put('/user', 
    userMiddleware.validatePasswordUpdate,
    userController.updateUsersPassword
);

module.exports = userRoutes;