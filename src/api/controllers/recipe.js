const fetchValues = require("../../services/fetchValues");
const generateNutritionReport = require("../../services/generateNutritionReport");
const Recipe = require("../../models/Recipe");

module.exports = {
  generateReport: async (recipe) => {
    const nutritionValues = await fetchValues(recipe);
    if (nutritionValues.errors) {
      return { errors: nutritionValues.errors };
    }
    return generateNutritionReport(nutritionValues, {
      prep: recipe.prep,
      title: recipe.title,
      ingr: recipe.ingr,
    });
  },
  saveRecipe: async (recipe) => {
    try {
      const recipes = await Recipe.find();
      const recipeExist = recipes.find(
        ({ title, prep }) => title === recipe.title || prep === recipe.prep
      );
      if (recipeExist) {
        return res.status(400).json({ errors: [{ msg: "Recipe exists" }] });
      }
      const newRecipe = new Recipe(recipe);
      await newRecipe.save();
      return newRecipe;
    } catch (error) {
      return { errors: [{ msg: error.message }] };
    }
  },
  getAll: async () => {
    try {
      const recipe = await Recipe.find();
      const titles = recipe.map(({ title, prep, _id }) => ({
        title,
        prep,
        id: _id,
      }));
      return titles;
    } catch (error) {
      return { errors: [{ msg: error.message }] };
    }
  },
  getRecipe: async (id) => {
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return { errors: [{ msg: "Couldn't find recipy" }] };
      }
      return recipe;
    } catch (error) {
      return { errors: [{ msg: "Couldn't find recipy" }] };
    }
  },
};
