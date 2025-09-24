const express = require("express");
const users = express.Router();
const passport = require("passport");
//conroller
const {
  createUser,
  getAllUsers,
  getUser,
  getUsername /**testing */,
  updateUser,
  deleteUser,
  getUserOrders,
  getUserOrder,
} = require("../controllers/userController");
 
//middel  wear

const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("Unauthorized path, log in to gain access");
};

//admin
users.get("/", getAllUsers); // complete

//auth needs to added for this
users.get("/:id", getUser); //complete
users.put("/:id", updateUser); //complete
users.delete("/:id", deleteUser); //complete

users.post("/register", createUser); //complete apart form hashing



//user order data
users.get("/:id/orders",  getUserOrders); //complete
users.get("/:id/orders/:orderid", getUserOrder); //complete

users.get("/user/:username", getUsername); //testing  / admin
module.exports = users;
   