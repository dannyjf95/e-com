const request = require("supertest");
const app = require("../../../../server"); // Ensure this path is correct
const models = require("../../../../models");

afterAll(async () => {
  await models.sequelize.close();
});

//LOGGIN IN CHECKS AND RESPONSES
describe("user login / out activity", () => {
  const agent = request.agent(app); //uses same session for these test

  it("should return 401 if no user is logged in", async () => {
    const response = await agent.get("/auth/check");
    expect(response.statusCode).toBe(401);
  });

  it("should log the user in and return 200", async () => {
    const response = await agent.post("/account/login").send({
      username: "dan",
      password: "dan",
    });
    expect(response.statusCode).toBe(302);
    expect(response.headers.location).toBe("/");
  });

  it("should return 200 if a user has logged in", async () => {
    const response = await agent.get("/auth/check");
    expect(response.statusCode).toBe(200);
  });

  it("should log an already logged in user out", async () => {
    await agent.post("/logout");
    const response = await agent.get("/auth/check");
    expect(response.statusCode).toBe(401);
    expect(response.text).toBe("no user logged in");
  });
});
