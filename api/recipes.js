const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const getNutritionValues = require("./helper/getNutritionValues");
const generateNutritionReport = require("./helper/generateNutritionReport");

router.post(
  "/",

  [
    check("title", "Please include title")
      .not()
      .isEmpty(),
    check("prep", "Please include how to make your recipe")
      .not()
      .isEmpty(),
    check("ingr", "Please include ingredienties")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const nutritionValues = await getNutritionValues(req.body);
      if (nutritionValues.errors) {
        res.status(401).json(nutritionValues);
        return;
      }
      const report = generateNutritionReport(nutritionValues, req.body);
      return res.json(report);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
