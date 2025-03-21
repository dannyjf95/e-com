const express = require("express");
const test = express.Router();

/** User */
const {
  registerUser,
  userOrders,
  userOrder,
  userOrderItems,
  orderSummary,

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

  /** Cart */
  addToCart,
  cartView,
  deleteFromCart,
  deleteCart,
  // mappedCart,
  checkCartForOrder,
  itemStock,
} = require("../../controllers/tests/testController");

// test.get("/mapped", mappedCart);

/** User-related Routes **/
test.get("/user", userOrders); // Get all user orders
test.get("/userorder", userOrder); // Get a specific user order
test.get("/userorderitems", userOrderItems); // Get order items for a specific user
test.post("/usercreatetest", registerUser); // Create/register a new user

/** Cart-related Route **/
test.get("/cart/view", cartView);
test.post("/cart/checkout", checkCartForOrder);
// test.get("/order/summary", orderSummary); //HERE NOW

/** Order-related Routes **/
test.get("/order", orderItems); // Get all order items

/** Item-related Routes **/
test.get("/items", getItems); // Get all items (admin route)
test.get("/items/search", itemSearch); // Search items

test.get("/item/details", itemStock);

/** Category-related Routes **/
test.get("/cats", getCategories); // Get all categories
test.get("/category/:catname", getCategory); // Get a specific category by name
test.get("/:cat/subs", getCategoryWithSubs); // Get a category with its sub-categories
test.get("/:cat/subcats", getSubCategoriesWithItems); // Get a sub-category with items

//get to get cart screen
//post to place order

test.post("/cart/");
test.post("/cart/add", addToCart);
// test.get("/cart", getCart);
test.delete("/cart/items/:id", deleteFromCart); //to do
test.delete("/cart/:id", deleteCart); //to do

module.exports = test;
