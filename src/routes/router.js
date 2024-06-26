const path = require("path");
const express = require("express");
const router = express();

const userRoutes = require("./userRoutes");
const loginRoutes = require("./loginRoutes");
const eventRoutes = require("./eventRoutes");
const pagesRoutes = require("./pagesRoutes");
const guestRouter = require("./guestRoutes");
const uploadRoutes = require("./uploadRoutes");
const recoverPassRoutes = require("./recoverPasswordRoutes");

router.use(pagesRoutes);
router.use("/api", loginRoutes);
router.use("/api", recoverPassRoutes);
router.use("/api", userRoutes);
router.use("/api", eventRoutes);
router.use("/api", guestRouter);
router.use("/api", uploadRoutes);

pagesRoutes.get("/*", (req, res, next) => {
	if (req.originalUrl.startsWith("/api")) {
		return next();
	}
	res.sendFile(path.join(__dirname, "../../public/index.html"));
	return;
});

module.exports = router;
