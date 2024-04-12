const express = require("express");
const dotenv = require("dotenv");
const app = express();
const router = require("./routes/router");

dotenv.config();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT || 3000);
