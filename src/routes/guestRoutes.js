const express = require("express");
const guestController = require("../controllers/guestController");
const eventMiddleware = require("../middlewares/eventMiddleware");
const guestMiddleware = require("../middlewares/guestMiddleware");
const validateRequestBody = require("../middlewares/validateRequestBody");
const guestSchema = require("../schemas/guestSchema");
const guestRouter = express.Router();

guestRouter.use('/guest/:id', guestMiddleware.validateEventId);
guestRouter.get("/guest/:id", guestController.getAllGuests);

guestRouter.use("/guest/:guestId", guestMiddleware.validateGuestId);
guestRouter.delete("/guest/:guestId", guestController.deleteOneGuest);

guestRouter.use("/guest/", validateRequestBody(guestSchema))
guestRouter.post("/guest/:id", guestController.createGuest);
guestRouter.put("/guest/:guestId", guestController.updateGuest);

module.exports = guestRouter;