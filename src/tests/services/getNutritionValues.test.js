const fetchValues = require("../../services/fetchValues");
const axios = require("axios");
const exampleResponse = {
  calories: 1230,
  cautions: [],
  dietLabels: ["LOW_CARB"],
  healthLabels: [
    "SUGAR_CONSCIOUS",
    "PEANUT_FREE",
    "TREE_NUT_FREE",
    "ALCOHOL_FREE",
    "SULPHITE_FREE",
  ],
  totalDaily: {
    CA: { label: "Calcium", quantity: 15.304499999999997, unit: "%" },
    CHOCDF: { label: "Carbs", quantity: 2.5866666666666664, unit: "%" },
    CHOLE: { label: "Cholesterol", quantity: 103.33333333333333, unit: "%" },
    ENERC_KCAL: { label: "Energy", quantity: 60.989, unit: "%" },
    FASAT: { label: "Saturated", quantity: 170.60680000000002, unit: "%" },
    FAT: { label: "Fat", quantity: 129.06153846153848, unit: "%" },
    FE: { label: "Iron", quantity: 69.47333333333333, unit: "%" },
    FIBTG: { label: "Fiber", quantity: 16.8, unit: "%" },
    FOLDFE: { label: "Folate equivalent (total)", quantity: 32.25, unit: "%" },
    K: { label: "Potassium", quantity: 32.95840425531915, unit: "%" },
    MG: { label: "Magnesium", quantity: 18.571428571428573, unit: "%" },
    NA: { label: "Sodium", quantity: 7.462083333333333, unit: "%" },
    NIA: { label: "Niacin (B3)", quantity: 173.6, unit: "%" },
    P: { label: "Phosphorus", quantity: 139.14285714285714, unit: "%" },
    PROCNT: { label: "Protein", quantity: 208.8, unit: "%" },
    RIBF: { label: "Riboflavin (B2)", quantity: 96.69230769230771, unit: "%" },
    THIA: { label: "Thiamin (B1)", quantity: 43.416666666666664, unit: "%" },
    TOCPHA: { label: "Vitamin E", quantity: 28.371666666666666, unit: "%" },
    VITA_RAE: { label: "Vitamin A", quantity: 10.666666666666666, unit: "%" },
    VITB12: { label: "Vitamin B12", quantity: 345.8333333333333, unit: "%" },
    VITB6A: { label: "Vitamin B6", quantity: 232.46153846153845, unit: "%" },
    VITC: { label: "Vitamin C", quantity: 12.444444444444445, unit: "%" },
    VITD: { label: "Vitamin D", quantity: 166.66666666666666, unit: "%" },
    VITK1: { label: "Vitamin K", quantity: 78.25750000000001, unit: "%" },
    ZN: { label: "Zinc", quantity: 160.27272727272728, unit: "%" },
  },
  totalNutrients: {
    CA: { label: "Calcium", quantity: 153.045, unit: "mg" },
    CHOCDF: { label: "Carbs", quantity: 7.76, unit: "g" },
    CHOLE: { label: "Cholesterol", quantity: 310, unit: "mg" },
    ENERC_KCAL: { label: "Energy", quantity: 1219.78, unit: "kcal" },
    FAMS: { label: "Monounsaturated", quantity: 39.843245, unit: "g" },
    FAPU: { label: "Polyunsaturated", quantity: 4.173534999999999, unit: "g" },
    FASAT: { label: "Saturated", quantity: 34.12136, unit: "g" },
    FAT: { label: "Fat", quantity: 83.89, unit: "g" },
    FATRN: { label: "Trans", quantity: 4.55, unit: "g" },
    FE: { label: "Iron", quantity: 12.5052, unit: "mg" },
    FIBTG: { label: "Fiber", quantity: 4.2, unit: "g" },
    FOLAC: { label: "Folic acid", quantity: 0, unit: "µg" },
    FOLDFE: { label: "Folate equivalent (total)", quantity: 129, unit: "µg" },
    FOLFD: { label: "Folate (food)", quantity: 129, unit: "µg" },
    K: { label: "Potassium", quantity: 1549.045, unit: "mg" },
    MG: { label: "Magnesium", quantity: 78, unit: "mg" },
    NA: { label: "Sodium", quantity: 179.09, unit: "mg" },
    NIA: { label: "Niacin (B3)", quantity: 27.776, unit: "mg" },
    P: { label: "Phosphorus", quantity: 974, unit: "mg" },
    PROCNT: { label: "Protein", quantity: 104.4, unit: "g" },
    RIBF: {
      label: "Riboflavin (B2)",
      quantity: 1.2570000000000001,
      unit: "mg",
    },
    SUGAR: { label: "Sugars", quantity: 3.76, unit: "g" },
    THIA: { label: "Thiamin (B1)", quantity: 0.5209999999999999, unit: "mg" },
    TOCPHA: { label: "Vitamin E", quantity: 4.25575, unit: "mg" },
    VITA_RAE: { label: "Vitamin A", quantity: 96, unit: "µg" },
    VITB12: { label: "Vitamin B12", quantity: 8.299999999999999, unit: "µg" },
    VITB6A: { label: "Vitamin B6", quantity: 3.022, unit: "mg" },
    VITC: { label: "Vitamin C", quantity: 11.2, unit: "mg" },
    VITD: { label: "Vitamin D", quantity: 25, unit: "IU" },
    VITK1: { label: "Vitamin K", quantity: 93.909, unit: "µg" },
    WATER: { label: "Water", quantity: 503.59, unit: "g" },
    ZN: { label: "Zinc", quantity: 17.630000000000003, unit: "mg" },
  },
  totalNutrientsKCal: {
    CHOCDF_KCAL: {
      label: "Calories from carbohydrates",
      quantity: 31,
      unit: "kcal",
    },
    ENERC_KCAL: { label: "Energy", quantity: 1219, unit: "kcal" },
    FAT_KCAL: { label: "Calories from fat", quantity: 765, unit: "kcal" },
    PROCNT_KCAL: {
      label: "Calories from protein",
      quantity: 423,
      unit: "kcal",
    },
  },
  totalWeight: 704.5,
  uri:
    "http://www.edamam.com/ontologies/edamam.owl#recipe_b1427abc10af4cb9befdf3ee8d1e2ac8",
  yield: 6,
};

jest.mock("axios");

describe("fetchValues", () => {
  const data = {
    ingr: ["500g beef steak", "200g asparagus", "1tsp olive oil"],
  };
  it("should exist", () => {
    expect(fetchValues).toBeDefined();
  });
  it("should give response", async () => {
    axios.post.mockResolvedValue({ data: exampleResponse });
    const res = await fetchValues(data);
    expect(res).toBeDefined();
    return expect(res).toHaveProperty("calories", "cautions", "dietLabels");
  });
});
