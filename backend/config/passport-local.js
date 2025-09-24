const models = require("../models"); //user model
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

console.log(
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // <--- change this from 'username' to 'email'
        passwordField: "password", // optional, defaults to 'password'
      },
      async function (email, password, done) {
        try {
          const user = await models.User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: "No User found" });
          }
          const validPassword = user.validPassword(password);
          if (!validPassword) {
            return done(null, false, {
              message: "Username and/or password did not match",
            });
          }
          //success
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await models.User.findByPk(id, { raw: true });

  done(null, user);
});
