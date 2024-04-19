const express = require("express");
const pagesRoutes = express.Router();
const path = require("path");
const privatePagesRouter = require("./privatePageRoutes");
const publicPagesRouter = require("./publicPageRoutes");

pagesRoutes.use(express.static(path.join(__dirname, "../../public")));
pagesRoutes.use(publicPagesRouter);
// middleware de autenticação
pagesRoutes.use(privatePagesRouter);

module.exports = pagesRoutes;
