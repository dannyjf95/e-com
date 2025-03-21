const { where } = require("sequelize");
const models = require("../../../models");

class Order {
  //create
  async createOrder(cart, transaction) {
    const newOrder = await models.Orders.create(
      {
        user_id: cart.userId ?? null,
        guest_id: cart.userId ? null : await this.guestUserCheck(),
        order_total: cart.cartTotal,
      },
      { transaction }
    );
    console.log(cart.items);
    const items = cart.items.map((item) => ({
      order_id: newOrder.id,
      item_id: item.id,
      item_quantity: item.quantity,
      item_size: item.size,
      price_per_item: item.price * item.quantity,
    }));

    await models.Order_items.bulkCreate(items, { transaction });

    return newOrder;
  }
  //read
  async getAllOrders() {
    return await models.Orders.findAndCountAll();
  }

  async getOrder(req) {
    const userOrGuest = req.user
      ? { id: req.user.id && req.session.orderId }
      : { id: req.session.orderId };
    const result = await models.Orders.findOne({
      where: userOrGuest,
      include: {
        model: models.Order_items,
        include: [models.Items],
      },
    });

    if (result) {
      return Object.assign(
        req.user ? { user_id: result.user_id } : { guest_id: result.guest_id },
        {
          orderTotal: result.order_total,
          items: result.Order_items.map((items) => ({
            itemId: items.id,
            name: items.Item.name,
            price: items.Item.price,
            quantity: items.item_quantity,
            size: items.item_size,
            price_X_quantity: items.price_per_item,
          })),
        }
      );
    }
  }

  async getGuestOrder(req) {
    await models.Orders.findOne({
      where: {
        id: req.session.orderId || null,
      },
      include: {
        model: models.Order_items,
        include: [models.Items],
      }, //include items and use map method
    });
  }

  async guestUserCheck() {
    let guestTemp = {
      //   name: "dan",
      //   email: "a@a.com",
      name: "tim",
      email: "tim@gmail.com",
    };

    let check = await models.Guest_user.findOne({
      where: { email: guestTemp.email },
      raw: true,
    });

    return check
      ? check.id
      : (await models.Guest_user.create(guestTemp)).get({ plain: true }).id;
  }

  //update
  //delete
}
module.exports = Order;
