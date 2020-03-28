const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

app.use(express.json({ extended: false }));

app.use("/recipes", require("./api/recipes"));

module.exports = app;