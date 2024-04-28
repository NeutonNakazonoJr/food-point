const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { PORT } = require("./config/config");
const router = require("./routes/router");
const app = express();
const multer = require("multer");


app.use(express.json());
// TO DO: CORS
app.use(cookieParser());
app.use(router);

app.listen(PORT, () => console.log("server running!"));
