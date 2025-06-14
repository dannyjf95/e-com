const models = require("../models"); //user model
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await models.User.findOne({ where: { username } });
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
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await models.User.findByPk(id, { raw: true });

  done(null, user);
});
