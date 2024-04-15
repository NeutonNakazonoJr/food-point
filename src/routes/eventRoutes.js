const express = require('express');
const eventRoutes = express();

const validateRequestBody  = require('../middlewares/validateRequestBody.js');
const eventSchema = require('../schemas/eventSchema.js');
const eventController = require('../controllers/eventController.js');


eventRoutes.post('/event', eventController.createNewEvent);
eventRoutes.put('/event/:id/basic-infos', validateRequestBody(eventSchema))

module.exports = eventRoutes;