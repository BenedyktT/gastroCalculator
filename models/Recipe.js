const mongoose = require("mongoose");

let RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  prep: { type: String, required: true },
  ingr: { type: Array, required: true },
  nutrients: { type: Object, required: true },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("recipe", RecipeSchema);
