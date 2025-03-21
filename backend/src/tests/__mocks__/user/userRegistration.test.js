const request = require("supertest");
const app = require("../../../server"); // Ensure this path is correct
const models = require("../../../../models");

afterAll(async () => {
  await models.sequelize.close();
});

describe("user creation", () => {
  const agent = request.agent(app); //uses same session for these test

  it("should create a new user and redirects to home", async () => {
    await agent.delete("/users/bob");
    const newUser = await agent.post("/users/register").send({
      name: "bob",
      username: "bob",
      email: "bobby@bobby.com",
      password: "bob",
    });

    //finds a user with request input name & double checks against request and db found user details
    const newUserCreatedData = await agent.get(
      `/users/user/${newUser.request._data.name}`
    );
    const newDBUserId = await agent.get(`/users/${newUserCreatedData.body.id}`);

    expect(newUser.status).toBe(302);
    expect(newDBUserId.body.name).toBe(newUser.request._data.name);
    expect(newDBUserId.body.username).toBe(newUser.request._data.username);
    expect(newDBUserId.body.email).toBe(newUser.request._data.email);

    await agent.delete(`/users/${newDBUserId.body.id}`);
  });
});
