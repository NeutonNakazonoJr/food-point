const express = require('express');
const eventRoutes = express();

const validateRequestBody  = require('../middlewares/validateRequestBody.js');
const eventSchema = require('../schemas/eventSchema.js');
const eventController = require('../controllers/eventController.js');
const userMiddleware = require('../middlewares/userMiddleware.js')

eventRoutes.post('/event', userMiddleware.validateUserId, eventController.createNewEvent);

module.exports = eventRoutes;