const { where } = require("sequelize");
const models = require("../../../models");

class Cart {
  constructor(userId) {
    this.userId = userId;
    this.cart = null;
  }

  //get
  async findUserCart(transaction) {
    //transactions only
    if (!this.cart) {
      const cart = await models.Cart.findOrCreate({
        //convert to method as repeated more than once
        where: { user_id: this.userId },
        include: {
          model: models.Cart_items,
          include: [models.Items],
        },
        transaction,
      });
      this.cart = cart[0];
    }
    return this.cart;
  }
  async refreshCart() {
    if (this.cart) {
      const refreshedCart = await models.Cart.findOne({
        where: { id: this.cart.id },
        include: {
          model: models.Cart_items,
          include: [models.Items],
        },
      });
      this.cart = refreshedCart;
    }
  }

  async mappedCart() {
    await this.refreshCart();
    const result = await this.findUserCart();
    return {
      cartId: result.id,
      userId: result.user_id,
      cartTotal: result.total_price,
      items: (result.Cart_items || []).map((item) => ({
        id: item.item_id,
        quantity: item.item_quantity,
        name: item.Item.name,
        price: item.Item.price,
        size: item.size,
      })),
    };
  }
  async getCart() {
    // console.log(await this.mappedCart());
    return this.mappedCart();
  }

  async getCartItems(raw = true) {
    return await models.Cart_items.findAll({
      where: { cart_id: this.cart.id },
      include: [models.Items],
      raw: raw,
    });
  }

  async getCartItem(item, transaction) {
    return await models.Cart_items.findOne({
      where: { cart_id: this.cart.id, item_id: item.id, size: item.size },
      transaction,
    });
  }

  async getCartPrice() {
    const cartItems = await this.getCartItems();

    const cartTotal = cartItems
      .map((item) => ({
        price: Number(item["Item.price"]) * Number(item.item_quantity),
      }))
      .map((item) => item.price);

    if (cartTotal.length === 0) {
      return 0;
    } else {
      return cartTotal.reduce((acc, curr) => acc + curr);
    }
  }

  //update

  async updateCartPrice(updatedTotal, transaction) {
    await models.Cart.update(
      { total_price: updatedTotal },
      { where: { id: this.cart.id } },
      transaction
    );
  }

  async updateItem(reqItem, existingItem, transaction) {
    await models.Cart_items.update(
      { item_quantity: reqItem.quantity, size: reqItem.size },
      {
        where: {
          id: existingItem.id,
          item_id: reqItem.id,
          cart_id: this.cart.id,
        },
        returning: true,
      },
      transaction
    );
  }

  //post(create)
  async createItem(reqItem, transaction) {
    return await models.Cart_items.create(
      {
        cart_id: this.cart.id,
        item_id: reqItem.id,
        item_quantity: reqItem.quantity,
        size: reqItem.size,
      },
      transaction
    );
  }

  //delete
  async deleteItem(itemId) {
    console.log(itemId);
    const item = await models.Cart_items.findOne({
      where: { id: 3 },
    });
    console.log(item);
    return await models.Cart_items.destroy({
      where: { cart_id: this.cart.id, item_id: itemId }, //cahnged form id to item_id(im dumm dumm)
      force: true,
    });
  }
}

module.exports = Cart;
