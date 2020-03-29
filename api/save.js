const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Recipe = require("../models/Recipe");
//get all recipes

router.get("/", async (req, res) => {
  try {
    const recipe = await Recipe.find();
    const titles = recipe.map(({ title, prep, _id }) => ({
      title,
      prep,
      id: _id
    }));
    return res.json(titles);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ errors: [{ msg: error.message }] });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Couldn't find recipy" }] });
    }
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
      const recipeExist = recipes.find(
        ({ title, prep }) => title === req.body.title || prep === req.body.prep
      );
      if (recipeExist) {
        return res.status(400).json({ errors: [{ msg: "Recipe exists" }] });
      }
      const newRecipe = new Recipe(req.body);
      await newRecipe.save();
      return res.json(newRecipe);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
