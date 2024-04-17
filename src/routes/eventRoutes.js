const express = require('express');
const eventRoutes = express();

const validateRequestBody  = require('../middlewares/validateRequestBody.js');
const eventSchema = require('../schemas/eventSchema.js');
const eventController = require('../controllers/eventController.js');
const eventMiddleware = require('../middlewares/eventMiddleware.js');


eventRoutes.post('/event', eventController.createNewEvent);

eventRoutes.use('/event/:id', eventMiddleware.validateEventId);

eventRoutes.put('/event/:id/basic-infos', 
    validateRequestBody(eventSchema.eventBasicInfos),
    eventController.updateEventBasicInfos
);

eventRoutes.post('/event/:id/dish',
    validateRequestBody(eventSchema.dish),
    eventController.createNewDish
)


module.exports = eventRoutes;