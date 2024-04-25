const express = require('express');
const router = express();

const userRoutes = require('./userRoutes');
const loginRoutes = require('./loginRoutes');
const eventRoutes = require('./eventRoutes');
const pagesRoutes = require('./pagesRoutes');
const guestRouter = require('./guestRoutes');

router.use(pagesRoutes);
router.use("/api", loginRoutes);
router.use("/api", userRoutes);
router.use("/api", eventRoutes);
router.use("/api", guestRouter);

module.exports = router;