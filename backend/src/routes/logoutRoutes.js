const express = require("express");
const logout = express.Router();

const handleLogout = (req, res, next, message) => {
  req.logout(function (err) {
    req.session.cart = [];
    if (err) {
      return next(err);
    }
    req.flash("notification", message);
    res.redirect("/");
  });
};
logout.post("/", (req, res, next) => {
  return handleLogout(req, res, next, 'Successfully logged out');
});
module.exports = logout;
