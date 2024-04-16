const express = require("express");
const path = require("path");
const privatePagesRouter = express.Router();

const goToIndexHTML = (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
};

privatePagesRouter.get("/home", goToIndexHTML);
privatePagesRouter.get("/home/create", goToIndexHTML);

module.exports = privatePagesRouter;
