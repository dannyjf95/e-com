const { raw } = require("express");
const models = require("../../../models");

/**
 * User-related functions
 */
async function registerUser(req, res) {
  console.log(req.body);
  const { name, email, password, username } = req.body;
  try {
    const result = await models.User.create({
      name: name || "apple",
      username: username || "dannyjf",
      email: email || "test@test.com",
      password: password || "testpassword",
    });
    res.status(201).json(result);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      console.log(error.errors[0].message);
      res
        .status(500)
        .json({ error: "validation error", message: error.errors[0].message });
    } else {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "Something went wrong", message: error.message });
    }
  }
}

async function userOrders(req, res) {
  try {
    const result = await models.User.findOne({
      include: [models.Orders],
    });
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function userOrder(req, res) {
  const { id, orderid } = req.params;
  console.log(req.params);

  try {
    const result = await models.User.findByPk(id || 1, {
      include: {
        model: models.Orders,
        where: { id: orderid || 1 },
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Order not found for this user" });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}

async function userOrderItems(req, res) {
  try {
    const result = await models.User.findByPk(1, {
      include: {
        model: models.Orders,
        where: { id: 1 },
        include: [models.Order_items],
      },
    });

    if (!result) {
      return res.status(404).json({ message: "Order not found for this user" });
    }

    res.status(200).json({ data: result.Orders[0].Order_items });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

/**
 * Order-related functions
 */
async function orderItems(req, res) {
  try {
    const { id } = req.params || 1;
    const result = await models.Orders.findByPk(1, {
      include: [models.Order_items],
    });
    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

/**
 * Category-related functions
 */
async function getItems(req, res) {
  try {
    const result = await models.Items.findAndCountAll();

    if (!result) {
      return res.status(404).json({ message: "items not found" });
    }

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getCategories(req, res) {
  try {
    const result = await models.Categories.findAndCountAll({
      include: [models.Sub_categories],
      order: [[models.Sub_categories, "id", "asc"]],
    });

    if (!result) {
      return res.status(404).json({ message: "categories not found" });
    }

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getCategory(req, res) {
  try {
    const result = await models.Categories.findOne({
      where: { name: req.params.catname },
    });

    if (!result) {
      return res.status(404).json({ message: "categories noasaaasat found" });
    }

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getCategoryWithSubs(req, res) {
  try {
    const result = await models.Categories.findOne({
      include: [models.Sub_categories],
      where: { name: req.params.catname },
      order: [[models.Sub_categories, "id", "asc"]],
    });

    if (!result) {
      return res.status(404).json({ message: "categories not found" });
    }

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getSubCategoriesWithItems(req, res) {
  console.log(req.params);
  try {
    const result = await models.Sub_categories.findAll({
      include: [models.Items],
      where: { name: req.params.subcat },
    });

    if (!result) {
      return res.status(404).json({ message: "categories not found" });
    }

    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

/**
 * Items-related functions HER   HERE HJERERERERE
 */
const { Op } = require("sequelize");
const GuestCart = require("../../services/cart/GuestCartServices");

async function itemSearch(req, res) {
  console.log(req.query);
  try {
    const result = await models.Items.findAll({
      where: {
        name: {
          [Op.like]: `%${req.query.q}%`,
        },
      },
    });
    if (!result) {
      return res.status(404).json({ message: "items not found" });
    }

    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}

/*
  CART functionality to be added to cardRoutes and crontroller
*/
async function addToCart(req, res) {
  const reqItem = req.body.item; // Example: { id: 1, name: 'Item', price: 69, quantity: 1 }
  // console.log(reqItem);
  try {
    if (req.user) {
      const userCart = await models.Cart.findOrCreate({
        //convert to method as repeated more than once
        where: { user_id: req.user.id },
        include: [models.Cart_items],
        raw: true,
        defaults: {
          total_price: 123,
        },
      });
      // console.log(userCart);
      const existingItem = await models.Cart_items.findOne({
        where: { cart_id: userCart[0].id, item_id: req.body.item.id },
      });
      // console.log(existingItem);
      if (existingItem) {
        const itemUpdate = await models.Cart_items.update(
          { item_quantity: reqItem.quantity },
          {
            where: { item_id: reqItem.id, cart_id: userCart[0].id },
            returning: true,
          }
        );
      } else {
        // console.log("no item in that users cart");
        const userCartItems = await models.Cart_items.create({
          cart_id: userCart[0].id,
          item_id: reqItem.id,
          item_quantity: reqItem.quantity,
        });
      }
      const updatedCart = await models.Cart.findOne({
        where: { user_id: req.user.id },
      });
      return res.status(200).json({ cart: updatedCart });
      // console.log("existing here", existingItem.dataValues);
    }

    //session cart
    if (!req.session.cart) {
      req.session.cart = [];
    }

    const existingItem = req.session.cart.find(
      (cartItem) => cartItem.id === reqItem.id
    );
    if (existingItem) {
      existingItem.quantity = reqItem.quantity;
    } else {
      req.session.cart.push(reqItem);
    }

    return res.status(200).json({ "session cart": req.session.cart });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Something went wrong", errorMessage: error.message });
  }
}

async function cartView(req, res) {
  if (req.user) {
    const result = await models.Cart.findOne({
      include: {
        model: models.Cart_items,
        include: [models.Items],
      },
      where: { user_id: 1 },
    });

    const userCart = {
      cartId: result.id,
      userId: result.user_id,
      totalPrice: result.total_price,
      item: (result.Cart_items || []).map((item) => ({
        id: item.item_id,
        quantity: item.item_quantity,
        name: item.Item.name,
        price: item.Item.price,
      })),
    };

    return res.status(200).json({ data: userCart });
  }
  const guestCart = new GuestCart(req.session.cart);
  return res.status(200).json({ "user cart": await guestCart.mappedCart() });
}

async function deleteFromCart(req, res) {
  const itemId = Number(req.params.id) || parseInt(req.params.id);

  try {
    if (req.user) {
      const userCart = await models.Cart.findOne({
        //convert to method as repeated more than once
        where: { user_id: req.user.id },
        include: {
          model: models.Cart_items,
          include: [models.Items],
        },
      });
      // console.log(userCart);
      const delItem = await models.Cart_items.destroy({
        where: { cart_id: userCart.id, item_id: itemId },
      });
      // console.log(delItem)

      const updatedUserCart = await models.Cart.findOne({
        //convert to method as repeated more than once
        where: { user_id: req.user.id },
        include: {
          model: models.Cart_items,
          // include:[models.Items]
        },
      });
      return res
        .status(200)
        .json({ usercart: updatedUserCart, message: "deleted item" }); //maps cart to return items in cart
    }
    //session cart
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart = req.session.cart.filter((item) => item.id !== itemId);
    // Send the updated cart back to the client
    return res.status(200).json({ sessioncart: req.session.cart });

    // Filter out the item to be deleted
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Something went wrong", errorMessage: error.message });
  }
}

async function deleteCart(req, res) {
  if (req.user) {
    const cart = await models.Cart.findOne({
      where: { id: req.params.id, user_id: req.user.id },
    });

    if (!cart) {
      return res.status(404).json({ message: "cart not found" });
    }
    await cart.destroy();
    return res.status(200).json({ message: "successfully emptied cart" });
  }
  //session cart
  req.session.cart = [];

  if (req.session.cart.length === 0) {
    return res.status(200).json({ message: "successfully emptied cart" });
  }
  return res.status(400).json({
    message: "Soemthing went wrong with clearing the cart, try again",
  });
}

async function checkCartForOrder(req, res) {
  // Dummy banking details
  const credit = 500;
  const card = ["1234", "1234", "1234", "1234"];
  const validCard = card.reduce((a, c) => a + c).length === 16;
  const userCart = req.session.userCart;

  // Validate card and check funds before starting the transaction
  try {
    if (req.user) {
      if (!userCart || userCart.item.length === 0) {
        return res.status(400).json({ message: "No cart to checkout" });
      }

      const funds = credit - Number(userCart.totalPrice);
      if (!validCard) {
        return res.status(403).json({ message: "Invalid card" });
      }
      if (funds < 0) {
        return res.status(400).json({ message: "Insufficient funds" });
      }

      // Begin transaction only if validations pass
      const result = await models.sequelize.transaction(async (transaction) => {
        const newOrder = await models.Orders.create(
          {
            user_id: userCart.userId,
            order_total: userCart.cartTotal,
          },
          { transaction }
        );

        const items = userCart.item.map((i) => ({
          order_id: newOrder.id,
          item_id: i.id,
          item_quantity: i.quantity,
          price_per_item: i.price * i.quantity,
        }));

        await models.Order_items.bulkCreate(items, { transaction });

        const cart = await models.Cart.findOne({
          where: { id: userCart.cartId },
        });
        await cart.destroy();
        req.session.userCart = [];
        return newOrder;
      });
      //adding to session so user can view order summary & can redirect
      req.session.userOrderId = result.id;
      return res.redirect("/order/summary");
    } else {
      //guest  cart functionality here
      res
        .status(400)
        .json({ message: "currently no guest user checkout set up right now" });
    }
  } catch (error) {
    console.error("Transaction error:", error);
    return res.status(500).json({ message: "Order processing failed" });
  }
}

async function orderSummary(req, res) {
  const orderSummary = await models.Orders.findAll({
    where: { user_id: req.user.id },
    order: [["id", "desc"]],
    limit: 1,
    include: [models.Order_items], //include items and use map method
  });
  res.send({ orderId: orderSummary });
}

async function itemStock(req, res) {
  try {
    const result = await models.Items.findOne({
      include: [models.Stock_details],
      where: { id: 1 },
    });
    res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    res.stats(500).json({ message: error.message });
  }
}

module.exports = {
  /** User */
  registerUser,
  userOrders,
  userOrder,
  userOrderItems,

  /** Order */
  orderItems,

  /** Category */
  getItems,
  getCategories,
  getCategory,
  getCategoryWithSubs,
  getSubCategoriesWithItems,

  /** Item */
  itemSearch,
  itemStock,

  /** guest session cart */
  addToCart,
  cartView,
  deleteFromCart,
  deleteCart,
  checkCartForOrder,

  /**user db cart */
  /**Order */
  orderSummary,
};
