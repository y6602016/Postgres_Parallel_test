const request = require("supertest");
const buildapp = require("../../app");
const UserRepo = require("../../repos/user-repo");
const pool = require("../../pool");
const Context = require("../context");
let context;

beforeAll(async () => {
  context = await Context.build();
});

beforeEach(async () => {
  await context.reset();
});

afterAll(() => {
  return context.close();
});

it("create a user", async () => {
  const startingCount = await UserRepo.count();

  await request(buildapp())
    .post("/users")
    .send({ username: "MIKEE", bio: "test" })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
