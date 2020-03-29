const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Recipe = require("../models/Recipe");
//get all recipes

router.get("/", async (req, res) => {
  try {
    const recipe = await Recipe.find();
    return res.json(recipe);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

router.post(
  "/",

  [
    check("ingr", "Please include ingredienties")
      .not()
      .isEmpty(),
    check("title", "Please include Title")
      .not()
      .isEmpty(),
    check("prep", "Please include preparation steps")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const recipes = await Recipe.find();
      console.log(recipes);
      const recipeExist = recipes.find(
        ({ title, prep }) => title === req.body.title || prep === req.body.prep
      );
      if (recipeExist) {
        return res.status(400).json({ errors: [{ msg: "Recipe exists" }] });
      }
      const newRecipe = new Recipe(req.body);
      await newRecipe.save();
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
