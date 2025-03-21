const request = require("supertest");
const app = require("../../../server"); // Ensure this path is correct
const models = require("../../../../models");

afterAll(async () => {
  await models.sequelize.close();
});

// USER AND GUEST SESSION CART ADDING OF ITEMS AND RESPONSES
describe("POST cart management, guest", () => {
  const agent = request.agent(app);

  it("should add an item to the guest session cart", async () => {
    // execute logout so we are is guest session
    await agent.post("/logout");
    const response = await agent.post("/cart/add").send({
      item: {
        id: 2, //item with id (2) = adidas running shoes
        quantity: 2,
        size: "8.7",
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toMatchObject({
      "guest cart": {
        user: "guest",
        cartTotal: "88.00",
        items: [
          {
            id: 2,
            name: "adidas running shoes",
            price: "44.00",
            quantity: 2,
            size: "8.7",
          },
        ],
      },
    });
    await agent.delete("/cart");
  });

  it("should remove an item from the guest session cart", async () => {
    //SETUP
    await agent.post("/cart/add").send({
      item: {
        id: 1, //item with id (1) = NIKE running shoes
        quantity: 1,
        size: "8.5",
      },
    });
    await agent.post("/cart/add").send({
      item: {
        id: 2, //item with id (2) = adidas running shoes
        quantity: 2,
        size: "8.5",
      },
    });

    const cart = await agent.get("/cart/view");
    expect(cart.body["guest cart"]).toMatchObject({
      user: "guest",
      cartTotal: "110.00",
      items: [
        {
          id: 1,
          name: "nike running shoes",
          price: "22.00",
          quantity: 1,
          size: "8.5",
        },
        {
          id: 2,
          name: "adidas running shoes",
          price: "44.00",
          quantity: 2,
          size: "8.5",
        },
      ],
    });
    expect(cart.body["guest cart"].items.length).toBe(2);

    //EXECUTION
    const response = await agent.delete("/cart/items/1");

    //assert
    expect(await response.body["guest cart"].items.length).toBe(1);
    expect(response.body["guest cart"]).toMatchObject({
      user: "guest",
      cartTotal: "88.00",
      items: [
        {
          id: 2,
          quantity: 2,
          name: "adidas running shoes",
          price: "44.00",
          size: "8.5",
        },
      ],
    });

    //POST TEST CLEANUP
    await agent.delete("/cart");
  });

  it("should update an item already existing inside the guest session cart", async () => {
    // starting with quantity == 5, updating to quanitiy == 1
    const itemAdded = await agent.post("/cart/add").send({
      item: {
        id: 1,
        quantity: 5,
        size: "8.5",
      },
    });
    await agent.post("/cart/add").send({
      item: {
        id: 1,
        quantity: 1,
        size: "8.5",
      },
    });

    const cart = await agent.get("/cart/view");
    expect(itemAdded.body["guest cart"].items[0].quantity).toBe(5);
    expect(cart.body["guest cart"].items[0].quantity).toBe(1);

    await agent.delete("/cart");
  });

  it("should remove all items in the guest session cart", async () => {
    //starts 1 as no item with id 0
    for (let i = 1; i <= 5; i++) {
      await agent.post("/cart/add").send({
        item: {
          id: i,
          quantity: 1,
          size: "8.5",
        },
      });
    }
    const cart = await agent.get("/cart/view");
    expect(cart.body["guest cart"].items.length).toBe(5);

    await agent.delete("/cart");
    const refreshedCart = await agent.get("/cart/view");
    expect(refreshedCart.body["guest cart"].items.length).toBe(0);
  });
});
