const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const getNutritionValues = require("./helper/getNutritionValues");
const generateNutritionReport = require("./helper/generateNutritionReport");

router.post(
  "/",

  [
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
        res.status(401).json({ errors: nutritionValues.errors });
        return;
      }
      const prep = req.body.prep ? req.body.prep : "placeholder";
      let title = req.body.title ? req.body.title : "title";
      const report = generateNutritionReport(nutritionValues, {
        prep,
        title,
        ingr: req.body.ingr
      });
      return res.json(report);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
