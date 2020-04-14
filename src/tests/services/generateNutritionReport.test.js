const generateNutritionReport = require("../../services/generateNutritionReport");
const fetchValues = require("../../services/fetchValues");

jest.mock("../../services/fetchValues");
describe("generateNutritionReport()", () => {
  it("exists", () => {
    expect(generateNutritionReport).toBeDefined();
  });
  it("should contain report", async () => {
    const nutritions = await fetchValues();
    const report = generateNutritionReport(nutritions, {
      title: "test",
      prep: "testprep",
      ingr: ["test"],
    });
    expect(report).toBeDefined();
    expect(report.calories).toBe(1230);
  });
  it("should ", () => {
    expect(true).toBe(true);
  });
});
