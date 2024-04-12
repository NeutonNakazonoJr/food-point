const express = require('express');
const router = express();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

router.use(userRoutes);
router.use(loginRoutes);

module.exports = router;