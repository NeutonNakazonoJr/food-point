const express = require('express');
const router = express();
const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');

router.use(loginRoutes);
router.use(userRoutes);

module.exports = router;