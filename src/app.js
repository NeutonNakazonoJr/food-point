const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const router = require("./routes/router");
const { PORT } = require("./config/config");

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(router);
app.listen(PORT, () => console.log("server running!"));
