const app = require("./server");
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`server is working on port ${PORT}`);
});
