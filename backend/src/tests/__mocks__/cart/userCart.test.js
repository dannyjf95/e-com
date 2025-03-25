const request = require("supertest");
const app = require("../../../../server"); // Ensure this path is correct
const models = require("../../../../models");
const Cart = require("../../../services/cart/CartServices");

afterAll(async () => {
  await models.sequelize.close();
});
// USER AND GUEST SESSION CART ADDING OF ITEMS AND RESPONSES
describe("POST user cart management", () => {
  const agent = request.agent(app);

  it("should log in user and return 302 to redirect page", async () => {
    const loginResponse = await agent.post("/account/login").send({
      username: "dan",
      password: "dan",
    });
    expect(loginResponse.statusCode).toBe(302); // Check for redirect after login
  });

  // /*   */

  // it("should add an item to the users cart", async () => {
  //   const response = await agent.post("/cart/add").send({
  //     item: {
  //       id: 2, //item with id (2) = adidas running shoes
  //       quantity: 2,
  //       size: "8.5",
  //     },
  //   });
  //   const cartId = await agent.get("/cart/1");
  //   const item = response.body["user cart"].items[0];
  //   const cartTotal = response.body["user cart"].cartTotal;

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body).toHaveProperty("user cart");
  //   expect(response.body).toMatchObject({
  //     "user cart": {
  //       cartId: cartId.body[0].id,
  //       userId: 1,
  //       cartTotal: "88.00",
  //       items: [
  //         {
  //           id: 2,
  //           quantity: 2,
  //           name: "adidas running shoes",
  //           price: "44.00",
  //           size: "8.5",
  //         },
  //       ],
  //     },
  //   });
  //   expect(item.name).toBe("adidas running shoes");
  //   expect(cartTotal).toBe((item.price * item.quantity).toFixed(2));

  //   await agent.delete("/cart");
  // });

  /*   */

  it("should remove an item from the user cart", async () => {
    //TEST CART PREP
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
    const cartId = await agent.get("/cart/1");
    const cart = await agent.get("/cart/view");
    expect(cart.body).toMatchObject({
      "user cart": {
        cartId: cartId.body[0].id,
        userId: 1,
        cartTotal: "110.00",
        items: [
          {
            "id": 2,
            "quantity": 2,
            "name": "adidas running shoes",
            "price": "44.00",
            "size": "8.5"
        },
        {
            "id": 1,
            "quantity": 1,
            "name": "nike running shoes",
            "price": "22.00",
            "size": "8.5"
        }
        ],
      },
    });
    expect(cart.body["user cart"].items.length).toBe(2);

    //TEST OBJECTIVE
    const response = await agent.delete("/cart/items/1");
    expect(await response.body["user cart"].items.length).toBe(1);
    expect(response.body["user cart"]).toMatchObject({
      cartId: cartId.body[0].id,
      userId: 1,
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
    // await agent.delete("/cart");
  });

  /*   */

  // it("should update an item already existing inside the cart", async () => {
  //   // starting with quantity == 5, updating to quanitiy == 1
  //   const itemAdded = await agent.post("/cart/add").send({
  //     item: {
  //       id: 1,
  //       quantity: 5,
  //       size: "8.5",
  //     },
  //   });
  //   await agent.post("/cart/add").send({
  //     item: {
  //       id: 1,
  //       quantity: 1,
  //       size: "8.5",
  //     },
  //   });

  //   const cart = await agent.get("/cart/view");
  //   expect(itemAdded.body["user cart"].items[0].quantity).toBe(5);
  //   expect(cart.body["user cart"].items[0].quantity).toBe(1);

  //   await agent.delete("/cart");
  // });

  /*   */

  // it("should remove all items in users cart", async () => {
  //   //starts 1 as no item with id 0
  //   for (let i = 1; i <= 5; i++) {
  //     await agent.post("/cart/add").send({
  //       item: {
  //         id: i,
  //         quantity: 1,
  //         size: "8.5",
  //       },
  //     });
  //   }
  //   const cart = await agent.get("/cart/view");
  //   expect(cart.body["user cart"].items.length).toBe(5);

  //   await agent.delete("/cart");
  //   const refreshedCart = await agent.get("/cart/view");
  //   expect(refreshedCart.body["user cart"].items.length).toBe(0);
  // });

  /*   */
});
