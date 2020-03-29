const supertest = require("supertest");
const app = require("../../server");
const request = supertest(app);
const db = require("../../config/connectDb");
const Recipe = require("../../models/Recipe");

//mock db
const payload = {
  title: "test",
  prep: "prep",
  ingr: ["ingr"],
  nutrients: { Fat: 12 },
  calories: 123,
  totalWeight: 1230
};

beforeAll(async () => {
  await db.connectDB();
});

afterEach(async () => {
  await db.clearDatabase();
});

afterAll(async () => {
  await db.close();
});

describe("save post", () => {
  test("it responds", async () => {
    const res = await request.post("/save");
    expect(res).toBeDefined();
    expect(res.header).toMatchObject({
      "content-type": "application/json; charset=utf-8"
    });
  });
  test("it gives 400 status when hit without data", async () => {
    const res = await request.post("/save");
    expect(res.status).toBe(400);
    expect(JSON.parse(res.text).errors.length).toBeTruthy();
  });
  test("it gives respond 200 when post with payload", async () => {
    const res = await request
      .post("/save")
      .set("content-type", "application/json")
      .send(payload);
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)).toHaveProperty("_id", "ingr", "title");
  });
});

describe("get titles", () => {
  beforeEach(async () => {
    const newRecipe = new Recipe(payload);
    await newRecipe.save();
  });
  test("it should respond with user data", async () => {
    const res = await request.get("/save");
    expect(res.status).toBe(200);
    expect(JSON.parse(res.text)[0]).toHaveProperty("title");
  });
  test("respond is array of recipes", async () => {
    const res = await request.get("/save");
    const data = JSON.parse(res.text);
    expect(typeof data[0]).toBe("object");
    expect(data[0]).toHaveProperty("id", "title", "ingr");
  });
});

describe("get recipe", () => {
  beforeEach(async () => {
    const newRecipe = new Recipe(payload);
    await newRecipe.save();
  });
  test("should fetch recipe", async () => {
    const usersReq = await request.get("/save");
    const user = JSON.parse(usersReq.text)[0];
    expect(user).toHaveProperty("id");
    const recipe = await request.get(`/save/${user.id}`);
    expect(recipe.status).toBe(200);
  });
});
