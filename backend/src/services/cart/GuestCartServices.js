const { where } = require("sequelize");
const models = require("../../../models");

class GuestCart {
  constructor(cart, req) {
    //cart being req.session.cart
    this.cart = cart;
    this.req = req;
  }

  async findGuestCart() {
    return await this.cart.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      size: `${item.size}`,
    }));
  }

  async getCart() {
    console.log(this.req.session.cart);
    return await this.mappedCart();
  }

  async getAllItems() {
    const details = await this.findGuestCart();
    let items = [];

    for (let i = 0; i < details.length; i++) {
      items.push({
        item: await models.Items.findOne({
          where: { id: details[i].id },
          raw: true,
        }),
        quantity: details[i].quantity,
        size: details[i].size,
      });
    }

    return items;
  }

  async mappedItems() {
    //tailored item data
    const items = await this.getAllItems();
    return items.map((i) => ({
      id: i.item.id,
      name: i.item.name,
      price: i.item.price,
      quantity: i.quantity,
      size: i.size,
    }));
  }

  async mappedCart() {
    //add items plus quantity and total price
    const items = await this.mappedItems();
    return {
      user: "guest",
      cartTotal: items
        .map((item) => Number(item.price) * Number(item.quantity))
        .reduce((acc, curr) => acc + curr, 0) // Accumulate the sum
        .toFixed(2), // Format the final sum to two decimal places
      items: items,
    };
  }
  async guestCart() {
    return await this.mappedCart();
  }

  async findOrUpdate() {}

  async itemExistingCheck(cart, itemId) {
    //cart being req.session.cart
    let message;
    itemId = parseInt(itemId); // Ensure itemId is an integer

    // Check if item exists
    let itemExists = cart.some((item) => parseInt(item.id) === itemId);

    if (!itemExists) {
      message = "Item does not exist in the cart";
      return { cart, message };
    }

    // Filter out the item
    const updatedCart = cart.filter((item) => parseInt(item.id) !== itemId);
    this.req.session.cart = updatedCart;

    this.cart = updatedCart;
    message = "Successfully removed item from the cart";

    return { cart, message };
  }
}

module.exports = GuestCart;
