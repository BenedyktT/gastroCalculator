if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");

connectDb.connectDB();

app.use(express.json({ extended: false }));

app.use("/recipes", require("./api/recipes"));
app.use("/save", require("./api/save"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
