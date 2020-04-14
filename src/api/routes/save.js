const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { saveRecipe, getAll, getRecipe } = require("./controllers/recipe");
//get all recipes

router.get("/", async (req, res) => {
  const titles = await getAll();
  if (titles.errors) {
    res.status(500).json(titles);
    return;
  }
  return res.status(200).json(titles);
});

router.get("/:id", async (req, res) => {
  const recipe = await getRecipe(req.params.id);
  if (recipe.errors) {
    res.status(404).json(recipe);
    return;
  }
  return res.status(200).json(recipe);
});

router.post(
  "/",

  [
    check("ingr", "Please include ingredienties").not().isEmpty(),
    check("title", "Please include Title").not().isEmpty(),
    check("prep", "Please include preparation steps").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newRecipe = await saveRecipe(req.body);
    if (newRecipe.errors) {
      res.status(500).json(newRecipe);
      return;
    }
    return res.status(200).json(newRecipe);
  }
);

module.exports = router;
