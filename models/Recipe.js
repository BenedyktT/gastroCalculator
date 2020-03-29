const mongoose = require("mongoose");

let RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  prep: { type: String, required: true },
  ingr: {
    type: Array,
    required: true,
    validate: {
      validator: v => v.length !== 0,
      message: () => "Include at least one ingredient"
    }
  },
  nutrients: {
    type: Object,
    required: true,
    validate: {
      validator: v => v.hasOwnProperty("Fat"),
      message: () => "Include at least one nutrient"
    }
  },
  cautions: { type: Array, required: false },
  totalWeight: { type: Number, required: true },
  dietLabels: {
    type: Array,
    required: false
  },
  healthLabels: {
    type: Array,
    required: false
  },
  calories: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("recipe", RecipeSchema);
