const recipes = require("../../api/routes/recipes");
const supertest = require("supertest");
const app = require("../../server");
const request = supertest(app);
const { killRedis } = require("../../services/cache");
jest.mock("../../services/fetchValues.js");
afterAll(async () => {
  await killRedis();
});

describe("recipe endpoint", () => {
  it("should exist", () => {
    expect(recipes).toBeDefined();
  });
  it("should give 400 status when no data is provided", async () => {
    const res = await request.post("/recipes");
    expect(res.status).toBe(400);
  });
  it("should show reason of error", async () => {
    const res = await request.post("/recipes");
    const data = JSON.parse(res.text);
    expect(data).toHaveProperty("errors");
    expect(data.errors.length).toBeTruthy();
    expect(data.errors[0]).toHaveProperty("msg", "param", "location");
  });
  it("should give response when data is provided", async () => {
    const res = await request.post("/recipes").send({
      title: "test",
      prep: "prep",
      ingr: ["600g beef", "100g lettuce"],
    });
    expect(res.status).toBe(200);
  });
});
