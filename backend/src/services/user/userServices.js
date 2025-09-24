const { where } = require("sequelize");
const models = require("../../../models");

class User {
  async create(req, res) {
    const { name, username, email, password } = req.body;
    const result = await models.User.create({
      name,
      username,
      email,
      password,
    });

    req.login(result, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("usercreated", "Successfully created account");
      return res.redirect("/");
    });
    //if  wanting users to login after creating =  more safe but would be seen as "annoying"
    // return res.redirect("/");
  }

  async getAllUsers() {
    //admin
    return await models.User.findAll();
  }

  async getUser(req) {
    return await models.User.findByPk(req.params.id);
  }
  async getUsername(req) {
    return await models.User.findOne({
      where: { username: req.params.username },
    });
  }

  async getUserOrders(req) {
    //admin maybe
    const result = await models.Orders.findAndCountAll({
      where: { user_id: req.user ? req.user.id : req.params.id },
      raw: true,
    });
    // return a.rows[0]
    const itemCount = await this.getOrderItemCount(result.rows[0].id);

    return {
      userId: req.user ? req.user.id : req.params.id,
      orders: result.rows.map((orders) => ({
        orderId: orders.id,
        itemCount: itemCount.count,
        orderTotal: orders.order_total,
      })),
    };
  }

  async getOrderItemCount(orderId) {
    return await models.Order_items.findAndCountAll({
      where: { order_id: orderId },
    });
  }

  async getUserOrder(req) {
    //alter back to just req.user id
    console.log(req.params.orderid);
    const a = await models.Orders.findOne({
      where: { id: parseInt(req.params.orderid) },
      include: { model: models.Order_items, include: [models.Items] },
    });
    console.log(a);

    return {
      orderTotal: a.order_total,
      items: a.Order_items.map((item) => ({
        name: item.Item.name,
        price: item.Item.price,
        size: item.item_size,
        quantity: item.item_quantity,
      })),
    };
  }

  async updateUser(req) {
    console.log(req.body);
    const { name, username, email, password } = req.body;
    return (
      await models.User.update(
        {
          email,
          name,
          password,
          username,
        },
        {
          where: { id: 6 },
          raw: true,
          returning: true, // To return the updated data
        }
      )
    )[1][0];
  }

  async deleteUser(req) {
    return await models.User.destroy({
      where: {
        id: req.params.id,
      },
      force: true,
    });
  }

  async logout(req, res, next, message) {
    req.logout(function (err) {
      req.session.cart = [];
      if (err) {
        return next(err);
      }
      req.flash("notification", message);
      res.redirect("/");
    });
  }
}

module.exports = User;
