const express = require("express");
const cookieParser = require("cookie-parser");
const { PORT } = require("./config/config");
const router = require("./routes/router");
const app = express();


app.use(express.json());

app.use(cookieParser());
app.use(router);

app.listen(PORT, () => console.log("server running!"));
