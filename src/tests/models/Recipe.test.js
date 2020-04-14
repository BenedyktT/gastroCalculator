const db = require("../../config/connectDb");
const Recipe = require("../../models/Recipe");

beforeAll(async () => {
  await db.connectDB();
});

afterEach(async () => {
  await db.clearDatabase();
});
afterAll(async () => {
  await db.close();
});

describe("Recipe model", () => {
  test("Model is defined", () => {
    expect(Recipe).toBeDefined();
  });
  test("it should cast an error when ingredients array is empty", async () => {
    const recipe = new Recipe({
      title: "test",
      prep: "prep",
      ingr: [],
      nutrients: {},
    });
    const error = recipe.validateSync();
    expect(error.errors.ingr.message).toBe("Include at least one ingredient");
  });
  test("it should cast an error when nutrients object is empty", async () => {
    const recipe = new Recipe({
      title: "test",
      prep: "prep",
      ingr: ["ingr"],
      nutrients: {},
    });
    const error = recipe.validateSync();
    expect(error.errors).toHaveProperty("nutrients");
    expect(error.errors.nutrients.message).toBe(
      "Include at least one nutrient"
    );
  });
  test("creates new recipe", async () => {
    const recipe = new Recipe({
      title: "test",
      prep: "prep",
      ingr: ["ingr"],
      nutrients: { Fat: "1234" },
      calories: 123,
      totalWeight: 1230,
    });
    const newRecipe = new Recipe(recipe);
    const errors = newRecipe.validateSync();
    expect(errors).toBeUndefined();
    const saved = await newRecipe.save();
    expect(saved).toBeDefined();
    expect(saved).toHaveProperty("date", "_id", "__v", "title", "prep", "ingr");
    expect(saved.title).toBe("test");
  });
});
