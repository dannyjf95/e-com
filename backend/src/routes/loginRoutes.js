const express = require("express");
const auth = express.Router();
const passport = require("passport");
const passport_local = require("../../config/passport-local");
// LOGIN
auth.post("/login", async (req, res, next) => {
  // console.log(req.body);
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(400).json({ message: "username or password is incorrect!" });
      }
      req.logIn(user, async (err) => {
        if (err) {
          return next(err);
        }
        req.flash("login", "Successfully logged in");
        return res.json({ success: true, user: user });
      });
    })(req, res, next);
  } catch (error) {
    res.send(500).json({ message: "catch error in login" });
    console.log(error.message);
  }
});

module.exports = auth;
