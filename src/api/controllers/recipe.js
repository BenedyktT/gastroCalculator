const fetchValues = require("../../services/fetchValues");
const generateNutritionReport = require("../../services/generateNutritionReport");
const Recipe = require("../../models/Recipe");
const { Cache } = require("../../services/cache");

const cache = new Cache(Recipe.collection.collectionName);
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
        return { errors: [{ msg: "Recipe exists" }] };
      }
      const newRecipe = new Recipe(recipe);
      await newRecipe.save();
      return newRecipe;
    } catch (error) {
      return { errors: [{ msg: error.message }] };
    }
  },
  getAll: async () => {
    const getCache = await cache.getCache();
    if (getCache) {
      return JSON.parse(getCache);
    }
    try {
      const recipe = await Recipe.find();
      const titles = recipe.map(({ title, prep, _id }) => ({
        title,
        prep,
        id: _id,
      }));
      cache.setCache(titles, "all");
      return titles;
    } catch (error) {
      return { errors: [{ msg: error.message }] };
    }
  },
  getRecipe: async (id) => {
    const getCache = await cache.getCache(id);
    if (getCache) {
      return JSON.parse(getCache);
    }
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return { errors: [{ msg: "Couldn't find recipy" }] };
      }
      cache.setCache(recipe, id);
      return recipe;
    } catch (error) {
      return { errors: [{ msg: "Couldn't find recipy" }] };
    }
  },
};
