const express = require("express");
const pagesRoutes = express.Router();
const path = require("path");

const goToIndexHTML = (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
};
pagesRoutes.use(express.static(path.join(__dirname, "../../public")));

pagesRoutes.get("/", goToIndexHTML);
pagesRoutes.get("/login", goToIndexHTML);
pagesRoutes.get("/register", goToIndexHTML);

pagesRoutes.get("/home", goToIndexHTML);
pagesRoutes.get("/home/create", goToIndexHTML);
pagesRoutes.get("/home/create/guest", goToIndexHTML);
pagesRoutes.get("/home/create/success", goToIndexHTML);


module.exports = pagesRoutes;
