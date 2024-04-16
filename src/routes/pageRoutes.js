const express = require("express");
const path = require("path");
const pageRoutes = express.Router();

const goToIndexHTML = (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/index.html"));
};

pageRoutes.use(express.static(path.join(__dirname, "../../public")));
pageRoutes.get("/", goToIndexHTML);
pageRoutes.get("/login", goToIndexHTML);
pageRoutes.get("/register", goToIndexHTML);
pageRoutes.get("/home", goToIndexHTML);
pageRoutes.get("/home/create", goToIndexHTML);

module.exports = pageRoutes;