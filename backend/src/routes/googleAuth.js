//express/passport
const express = require("express");
const passport = require("passport");
const googleLogin = express.Router();
//data
const { User } = require("../../models");
//env
require("dotenv").config();
//google login strategy
const GoogleStrategy = require("passport-google-oidc");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "http://localhost:5000/login/google/oauth2/redirect/google",
      scope: ["profile"],
    },
    async (issuer, profile, cb) => {
      console.log("here", profile);
      try {
        let user = await User.findOne({ where: { googleId: profile.id } });
        if (!user) {
          console.log("creating");
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails?.[0]?.value,
            username: profile.displayName,
            password: "apple",
          });
        }

        return cb(null, user);
      } catch (e) {
        return cb(e);
      }
    }
  )
);

googleLogin.get("/", passport.authenticate("google", { scope: ["openid", "profile", "email"] }));
googleLogin.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/account/login", failureMessage: true }),
  function (req, res) {
    res.redirect("http://localhost:5173/");
  }
);

module.exports = googleLogin;
