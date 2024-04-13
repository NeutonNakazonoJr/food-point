const express = require('express');
const router = express();

const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const pageRoutes = require("./pageRoutes");

router.use(loginRoutes);
router.use(pageRoutes);
router.use(userRoutes);

module.exports = router;