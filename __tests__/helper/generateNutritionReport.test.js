const generateNutritionReport = require("../../api/helper/generateNutritionReport");
const getNutritionValues = require("../../api/helper/getNutritionValues");
jest.mock("../../api/helper/getNutritionValues");
describe("generateNutritionReport()", () => {
  it("exists", () => {
    expect(generateNutritionReport).toBeDefined();
  });
  it("should contain report", async () => {
    const nutritions = await getNutritionValues();
    const report = generateNutritionReport(nutritions, {
      title: "test",
      prep: "testprep",
      ingr: ["test"]
    });
    expect(report).toBeDefined();
    expect(report.calories).toBe(1230);
  });
  it("should ", () => {
    expect(true).toBe(true);
  });
});
