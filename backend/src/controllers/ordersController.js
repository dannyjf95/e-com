const models = require("../../models/");
const Sequelize = require("sequelize");
const Order = require("../services/order/OrderServices");

//get

//admin this route no one should see all orders
const orderInstance = new Order();
const getAllOrders = async (req, res) => {
  if (!req.session.admin) {
    // req.session.admin = true;
  }
  try {
    if (req.session.admin) {
      const result = await orderInstance.getAllOrders();
      if (result) {
        return res.status(200).json({ "all orders": result });
      }
      return res.status(404).json({ message: "Orders not found" });
    }
    return res.status(401).send("Unauthorized path, log in to gain access"); //change to auth  middeleware
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(500);
  }
};

const getOrderSummary = async (req, res) => {
  // const { id } = req.params;
  try {
    if (req.user) {
      const result = await orderInstance.getOrder(req);

      if (result) {
        return res.status(200).json({ data: result });
      }
      return res.status(404).json({ message: "Order not found" });
    } else {
      const result = await orderInstance.getOrder(req);

      if (result) {
        return res.status(200).json({ data: result });
      }
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(401).send("Unauthorized path, log in to gain access");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Order processing failed", error: error.message });
  }
};

//create
const createOrder = async (cart, transaction) => {
  // console.log(cart)
  const newOrder = await orderInstance.createOrder(cart, transaction);

  return newOrder;
};
//update
//delete

module.exports = {
  getAllOrders,
  createOrder,

  getOrderSummary,
};
