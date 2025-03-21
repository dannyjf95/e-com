const express = require("express");
const orders = express.Router();

const {
  getAllOrders,
  createOrder,
  getOrderSummary,
  getOrderItems,
  // orderSummary,
} = require("../controllers/ordersController");

//need authing and admin sectioning



orders.get("/", getAllOrders); //complete
orders.get("/order/:id/summary", getOrderSummary); //complete for multiple reasons

//latest user order summary page
//admin

//add user/orders endpoint
module.exports = orders;
