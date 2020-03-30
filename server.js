const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");

connectDb.connectDB();

app.use(express.json({ extended: false }));

app.use("/recipes", require("./api/recipes"));
app.use("/save", require("./api/save"));

module.exports = app;
