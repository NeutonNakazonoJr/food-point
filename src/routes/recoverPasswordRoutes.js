const express = require('express');
const recoverPassMiddleware = require('../middlewares/recoverPasswordMiddleware');
const recoverPasswordController = require('../controllers/recoverPasswordController');
const userMiddleware = require('../middlewares/userMiddleware');
const recoverPassRoutes = express();

recoverPassRoutes.post('/recover-pass', 
    recoverPassMiddleware.validateEmail, 
    recoverPasswordController.sendEmailToRecoverPass
);

recoverPassRoutes.put('/recover-pass', 
    recoverPassMiddleware.validadeToken, 
    userMiddleware.validateUserId, 
    recoverPasswordController.putNewUserPassword
);

module.exports = recoverPassRoutes;