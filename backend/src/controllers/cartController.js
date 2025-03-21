const { where } = require("sequelize");
const models = require("../../models");

const Cart = require("../services/cart/CartServices");
const GuestCart = require("../services/cart/GuestCartServices");
const { createOrder } = require("./ordersController");

const getCart = async (req, res) => {
  res.status(200).send(
    await models.Cart.findAll({
      where: { user_id: req.params.userid },
      order: [["id", "desc"]],
      limit: 1,
      raw: true,
    })
  );
};

const addToCart = async (req, res) => {
  const reqItem = req.body.item; // Example: { id: 1, name: 'Item', price: 69, quantity: 1 }
  // console.log('here',  reqItem);
  try {
    if (req.user) {
      const result = await models.sequelize.transaction(async (transaction) => {
        //source
        const userCart = new Cart(req.user.id);
        await userCart.findUserCart(transaction);

        //action
        const existingItem = await userCart.getCartItem(reqItem);

        if (!existingItem) {
          //works  for LOGGED IN ONLY
          await userCart.createItem(reqItem, transaction);
        } else {
          await userCart.updateItem(
            reqItem,
            existingItem.dataValues,
            transaction
          );
        }
        // else if (
        //   existingItem.dataValues.id &&
        //   existingItem.dataValues.size === req.body.item.size
        // ) {
        //   await userCart.updateItem(reqItem, transaction);
        // }

        const updatedTotal = await userCart.getCartPrice(transaction);
        await userCart.updateCartPrice(updatedTotal, transaction);

        //results
        return (req.session.userCart = await userCart.getCart());
      });
      return res.status(200).json({ "user cart": result });
    }
    /**
      session cart
    */
    if (!req.session.cart) {
      req.session.cart = [];
    }
    // req.session.cart = []
    const guestCart = new GuestCart(req.session.cart);

    let updated = false;
    for (let item of guestCart.cart) {
      if (item.id === reqItem.id) {
        if (item.size === reqItem.size) {
          item.quantity = reqItem.quantity;
          updated = true;
        }
      }
    }
    if (!updated) {
      req.session.cart.push(reqItem);
    }
    //for testing the catch 500 error
    // throw Error()
    return res.status(200).json({ "guest cart": await guestCart.guestCart() });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong", errorMessage: error });
  }
};

const deleteItem = async (req, res) => {
  try {
    if (req.user) {
      //source
      const userCart = new Cart(req.user.id);
      await userCart.findUserCart();

      //action
      await userCart.deleteItem(req.params.id);
      const updatedTotal = await userCart.getCartPrice();
      await userCart.updateCartPrice(updatedTotal);

      //results
      return res.status(200).json({
        "user cart": await userCart.getCart(),
        message: "successfully removed from cart",
      });
    }

    //GUEST
    if (!req.session.cart) {
      req.session.cart = [];
    }
    //source
    //maybe not best solution  but only fix i could think of to be able
    //to acces cart view after deleting an item and updaing the sesion cart
    const guestCart = new GuestCart(req.session.cart, req);

    //action
    const cartCheck = await guestCart.itemExistingCheck(
      req.session.cart,
      req.params.id
    );
    const updatedCart = await guestCart.getCart();
    //results
    return res.status(200).json({
      "guest cart": updatedCart,
      message: cartCheck.message,
    });

    // Filter out the item to be deleted
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ error: "Something went wrong", errorMessage: error.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    if (req.user) {
      //source
      const userCart = new Cart(req.user.id);
      const cart = await userCart.findUserCart();
      let cartItems = await userCart.getCartItems(false);

      if (!cart) {
        return res.status(404).json({ message: "cart not found" });
      }
      //action
      await Promise.all((cartItems = cartItems.map((item) => item.destroy())));
      await userCart.updateCartPrice(0);
      //results
      return res.status(200).json({ message: "successfully emptied cart" });
    }
    //GUEST
    req.session.cart = [];
    if (req.session.cart.length === 0) {
      return res.status(200).json({ message: "successfully emptied cart" });
    }
    return res.status(400).json({
      message: "Soemthing went wrong with clearing the cart, try again",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Something went wrong", errorMessage: error.message });
  }
  //session cart
};

const cartView = async (req, res) => {
  try {
    if (req.user) {
      //source
      const userCart = new Cart(req.user.id);
      //action
      if (userCart) {
        req.user.cart = (await userCart.mappedCart(req.user.id)) || [];
        return res.status(200).json({ "user cart": req.user.cart });
      }
      return res.status(404).json({ message: "Cart not found" });
    }
    //results
    const guestCart = new GuestCart(req.session.cart, req);
    // req.session.cart = req.session.cart = await guestCart.getCart();

    return res.status(200).json({ "guest cart": await guestCart.getCart() });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "Something went wrong", errorMessage: error.message });
  }
};

//middleware checks before checkout
const cartCheckout = async (req, res) => {
  // Dummy banking details
  const credit = req.credit;
  const cart = req.cart;

  const availableFunds = credit - Number(cart.cartTotal);
  if (availableFunds < 0) {
    return res.status(400).json({ message: "Insufficient funds" });
  }
  try {
    // Begin transaction only if validations pass
    const result = await models.sequelize.transaction(async (transaction) => {
      const newOrder = await createOrder(cart, transaction); //access's orders controller
      if (req.user) {
        const userCart = await models.Cart.findOne({
          where: { user_id: cart.userId },
        });
        await userCart.destroy();
        req.session.userCart = [];
      } else {
        req.session.guestCart = [];
      }
      return newOrder;
    });

    req.session.orderId = result.id;
    res.redirect(`/orders/order/${req.session.orderId}/summary`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ errorMessage: error.message });
  }
};

module.exports = {
  addToCart,
  cartView,
  deleteItem,
  deleteCart,
  cartCheckout,
  getCart,
};
