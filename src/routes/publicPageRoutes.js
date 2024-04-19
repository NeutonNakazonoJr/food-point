const express = require("express");
const path = require("path");
const publicPagesRouter = express.Router();

const goToIndexHTML = (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
};

publicPagesRouter.get("/", goToIndexHTML);
publicPagesRouter.get("/login", goToIndexHTML);
publicPagesRouter.get("/register", goToIndexHTML);
publicPagesRouter.get("/event", goToIndexHTML);

module.exports = publicPagesRouter;
