const express = require("express");
const pagesRoutes = express.Router();
const path = require("path");

const goToIndexHTML = (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
	return;
};
pagesRoutes.use(express.static(path.join(__dirname, "../../public")));

pagesRoutes.get("/", goToIndexHTML);
pagesRoutes.get("/error", goToIndexHTML);
pagesRoutes.get("/login", goToIndexHTML);
pagesRoutes.get("/register", goToIndexHTML);
pagesRoutes.get("/forget-password", goToIndexHTML);

pagesRoutes.get("/home", goToIndexHTML);
pagesRoutes.get("/home/create", goToIndexHTML);
pagesRoutes.get("/home/create/guest", goToIndexHTML);
pagesRoutes.get("/home/create/success", goToIndexHTML);
pagesRoutes.get("/home/create/menu", goToIndexHTML);
pagesRoutes.get("/home/create/local", goToIndexHTML);

pagesRoutes.get("/event", goToIndexHTML);
pagesRoutes.get("/profile", goToIndexHTML);
pagesRoutes.get("/list", goToIndexHTML);


module.exports = pagesRoutes;
