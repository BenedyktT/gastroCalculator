const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { generateReport } = require("../controllers/recipe");

router.post(
  "/",

  [check("ingr", "Please include ingredienties").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const prep = req.body.prep ? req.body.prep : "placeholder";
      let title = req.body.title ? req.body.title : "placeholder title";
      const recipe = { prep, title, ingr: req.body.ingr };
      const report = await generateReport(recipe);
      if (report.errors) {
        return res.status(555).json(report);
      }
      return res.json(report);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ errors: [{ msg: error.message }] });
    }
  }
);

module.exports = router;
