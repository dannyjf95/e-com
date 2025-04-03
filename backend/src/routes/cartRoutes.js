const express = require("express");
const cart = express.Router();

const {
  addToCart,
  cartView,
  deleteItem,
  deleteCart,
  cartCheckout,
  getCart,
} = require("../controllers/cartController");

const { validateCard, validateCart } = require("../middleware/cart");
//renders
// cart.get("/", (req, res) => {
//   res.send("shopping cart screen");
// }); //renders the checkout screen

/** Cart-related Route **/


cart.get("/view", cartView); //complete

cart.post("/add", addToCart); //complete
cart.post("/checkout", /*checks */ validateCard, validateCart, cartCheckout); //complete

cart.delete("/items/:id", deleteItem); //complete

cart.delete("/", deleteCart); //complete

 
// these two left

cart.get("/:userid", getCart);
//


module.exports = cart;
  