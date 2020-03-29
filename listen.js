const app = require("./server");
const PORT = process.env.PORT || 5000;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(PORT, (req, res) => {
  console.log(`server is working on port ${PORT}`);
});
