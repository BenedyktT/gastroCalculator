const express = require("express");
const app = express();
const connectDb = require("./config/connectDb");
const path = require("path");
const root = require("path").join(__dirname, "/../client", "build");
connectDb.connectDB();

app.use(express.json({ extended: false }));
app.use("/recipes", require("./api/routes/recipes"));
app.use("/save", require("./api/routes/save"));

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "ci") {
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client", "build", "index.html"));
  });
}

module.exports = app;
