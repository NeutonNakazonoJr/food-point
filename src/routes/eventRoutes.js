const express = require('express');
const eventRoutes = express();

const validateRequestBody  = require('../middlewares/validateRequestBody.js');
const validateDishId = require('../middlewares/dishMiddleware.js');
const validateIngredientId = require('../middlewares/ingredientMiddleware.js');
const eventMiddleware = require('../middlewares/eventMiddleware.js');

const eventSchema = require('../schemas/eventSchema.js');
const dishSchema = require('../schemas/dishSchema.js');
const { ingredientSchema, purchaseListSchema } = require('../schemas/ingredientSchema.js');

const eventController = require('../controllers/eventController.js');
const dishController = require('../controllers/dishController.js');
const ingredientController = require('../controllers/ingredientController.js');


eventRoutes.post('/event', eventController.createNewEvent);
eventRoutes.get('/event', eventController.getAllEvents);
eventRoutes.use('/event/:id', eventMiddleware.validateEventId);
eventRoutes.get('/event/:id', eventController.getAllEventInfos);
eventRoutes.delete('/event/:id', eventController.deleteEvent);

eventRoutes.put('/event/:id/location', validateRequestBody(eventSchema.eventLocation), eventController.updateEventLocation);
eventRoutes.put('/event/:id/basic-infos', validateRequestBody(eventSchema.eventBasicInfos), eventController.updateEventBasicInfos);
eventRoutes.get('/event/:id/purchase-list', eventController.getEventPurchaseList);
eventRoutes.put('/event/:id/purchase-list', validateRequestBody(purchaseListSchema),eventController.updateIngredientPurchaseList);

eventRoutes.post('/event/:id/dish', validateRequestBody(eventSchema.dish), eventController.createNewDish);
eventRoutes.use('/event/:id/dish/:dishId', validateDishId);
eventRoutes.put('/event/:id/dish/:dishId', validateRequestBody(dishSchema), dishController.updateDishName);
eventRoutes.delete('/event/:id/dish/:dishId', dishController.deleteDish);


eventRoutes.get('/event/:id/dish/:dishId/ingredient', ingredientController.getIngredientsName);
eventRoutes.use('/event/:id/dish/:dishId/ingredient/:ingredientId', validateIngredientId);
eventRoutes.delete('/event/:id/dish/:dishId/ingredient/:ingredientId', ingredientController.deleteIngredient);
eventRoutes.use('/event/:id/dish/:dishId/ingredient', validateRequestBody(ingredientSchema));
eventRoutes.post('/event/:id/dish/:dishId/ingredient', ingredientController.registerNewIngredient);
eventRoutes.put('/event/:id/dish/:dishId/ingredient/:ingredientId', ingredientController.updateIngredient);


module.exports = eventRoutes;