const supertest = require("supertest");
const app = require("../../server");
const request = supertest(app);
const db = require("../../config/connectDb");

//mock db

beforeAll(async () => {
  await db.connectDB();
});

afterEach(async () => {
  await db.clearDatabase();
});
afterAll(async () => {
  await db.close();
});

const payload = {
  title: "test",
  prep: "prep",
  ingr: ["ingr"],
  nutrients: { Fat: 12 }
};

describe("save endpoint", () => {
  test("it respond", async () => {
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
