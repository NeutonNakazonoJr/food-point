const express = require('express');
const router = express();
const userRoutes = require('./userRoutes');

router.use(userRoutes);

module.exports = router;