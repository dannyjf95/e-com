const request = require("supertest");
const app = require("../../../server"); // Ensure this path is correct
const models = require("../../../../models");
const Cart = require("../../../services/cart/CartServices");

afterAll(async () => {
  await models.sequelize.close();
});
// USER AND GUEST SESSION CART ADDING OF ITEMS AND RESPONSES
describe("GET user/guest realted search query results", () => {
  const agent = request.agent(app);

  it("should should return items related to search", async () => {
    //arrayContains for multi values inside an array
    const search = await agent.get("/search?q=running%20footware");

    expect(search.body["search results"].items).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "nike running shoes",
          price: "22.00",
          sub_category_id: 1,
        },
        {
          id: 2,
          name: "adidas running shoes",
          price: "44.00",
          sub_category_id: 1,
        },
      ])
    );
    expect(search.body["search results"].items[0].name).toBe("nike running shoes");
    expect(search.body["search results"].items[1].name).toBe("adidas running shoes");
  });

  it("should should return categories related to search", async () => {
    // toContainEqual for a single object
    const search = await agent.get("/search?q=running%20footware");

    expect(search.body["search results"].categories).toContainEqual({
      id: 1,
      name: "footware",
    });
    expect(search.body["search results"].categories[0].name).toBe("footware");
  });

  it("should should return sub categories related to search", async () => {
    // toContainEqual for a single object
    const search = await agent.get("/search?q=running%20footware");

    expect(search.body["search results"].subCategories).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "running shoes",
          category_id: 1,
        },
      ])
    );
    expect(search.body["search results"].subCategories[0].name).toBe("running shoes");
  });

  //MAIN RESPONSE TO DISPLAY DATA

  it("should should return items, categories and sub categories realted to search query", async () => {
    // toContainEqual for a single object
    const search = await agent.get("/search?q=running%20footware");

    expect(search.body).toMatchObject({
      "search results": {
        items: [
          {
            id: 1,
            name: "nike running shoes",
            price: "22.00",
            sub_category_id: 1,
          },
          {
            id: 2,
            name: "adidas running shoes",
            price: "44.00",
            sub_category_id: 1,
          },
        ],
        categories: [
          {
            id: 1,
            name: "footware",
          },
        ],
        subCategories: [
          {
            id: 1,
            name: "running shoes",
            category_id: 1,
          },
        ],
      },
    });
  });

  
});
