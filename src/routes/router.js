const express = require('express');
const router = express();
const userRoutes = require('./userRoutes');
const pageRoutes = require("./pageRoutes");

router.use(pageRoutes);
router.use(userRoutes);

module.exports = router;