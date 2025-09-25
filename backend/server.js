const express = require("express"); // express
const app = express(); // express
const PORT = 5000; //port || env.port
const morgan = require("morgan"); //logging
const passport = require("passport"); //passport
const process = require("node:process");
const path = require("path");

//front end interactions
const cors = require("cors");

//process / node depreciation warnings

process.on("warning", (warning) => {
  console.log("warning", warning.stack);
});
// console.log("here", process.argv[2]);

const session = require("express-session"); //session
const flash = require("connect-flash");

// const { getInitialCats } = require("./controllers/categoryController");
const Cart = require("./src/services/cart/CartServices");
const GuestCart = require("./src/services/cart/GuestCartServices");

app.set("trust proxy", 1);
//middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // This is required for cookies/sessions
  })
);
app.use(morgan("dev")); //logging
app.use(express.json()); //json-parsing
app.use(express.urlencoded({ extended: true })); //json-parsing

/**
 SESSION MIDDLEWARE
*/
app.use(
  session({
    secret: "secretstring",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000, // 1 day session
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax", // Allows cookies to be sent across different origins
    },
  })
);

app.use(flash());
/**
 * PASSPORT MIDDLEWARE
 */
app.use(passport.initialize());
app.use(passport.session()); // Add this to manage user session

/*
 middleware temp
*/
const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send("Unauthorized path, log in to gain access");
};

// app.use((req, res, next) => {
//   console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`, {
//     headers: req.headers,
//     body: req.body
//   });
//   next();
// });

app.use("/", async (req, res, next) => {
  // console.log("HERE@", req.session.guestCart ? req.session.userCart : "no  cart");
  // console.log(req.session)
  req.isAdmin = false;

  if (!req.session.cart) {
    req.session.cart = [];
  }

  if (req.user) {
    // console.log('yes')
    if (!req.session.userCart) {
      const userCart = new Cart(req.user.id);
      req.session.userCart = await userCart.getCart(); // Cache the user's cart in the session
    }
    req.user.cart = req.session.userCart; // Use the session-stored cart
  }

  const guestCart = new GuestCart(req.session.cart);
  req.session.guestCart = await guestCart.guestCart();

  return next();
});
//session check
app.get("/session", (req, res) => {
  // if (req.user) console.log(req.user);
  // console.log(req.isAdmin);
  if (req.isAuthenticated()) {
    res.json({ user: req.user }); // Passport automatically attaches `req.user`
  } else {
    res.json({ user: null });
  }
});

/**
 USER ROUTERS 
*/
const usersRouter = require("./src/routes/userRoutes");
app.use("/users", usersRouter);

/**
 ORDER ROUTERS 
*/

const ordersRouter = require("./src/routes/orderRoutes");
app.use("/orders", ordersRouter);

/**
 CATEGORY & SUB CATEGORY ROUTES  
*/
const categoryRouter = require("./src/routes/categoryRoutes");
app.use("/categories", categoryRouter);

/**
 ITEM ROUTES  
*/
const itemRouter = require("./src/routes/itemRoutes");
app.use("/items", itemRouter);

/** CART ROUTES */

const cartRouter = require("./src/routes/cartRoutes");
app.use("/cart", cartRouter);

/**
 search ROUTES 
*/
const searchRouter = require("./src/routes/searchRoutes");
app.use("/search", searchRouter);

/*
LOGIN / LOGOUT
*/
const loginRouter = require("./src/routes/loginRoutes");
app.use("/account", loginRouter);

//GOOGLE
const googleLogin = require("./src/routes/googleAuth");
app.use("/login/google", googleLogin);

const logoutRouter = require("./src/routes/logoutRoutes");
app.use("/logout", logoutRouter);

/** 
 TEST ROUTES 
*/
const testRouter = require("./src/routes/admin/testRoutes");
app.use("/test", testRouter);

/** 
 *    
 HOME PAGE  
*/

app.get("/", async (req, res) => {
  const loginMessage = req.flash("login")[0];
  const loggedOutMessage = req.flash("loggedOut")[0];
  const accountDelete = req.flash("notification")[0];
  const userCreated = req.flash("usercreated")[0];

  console.log("here", loginMessage);
  if (!req.session.cart) {
    req.session.cart = [];
  }
  if (req.user) {
    res.status(200).send({
      username: req.user.username,
      "user cart": req.user.cart || [],
      message: loginMessage ?? userCreated,
    });
  } else {
    res.status(200).send({
      user: "guest",
      "guest cart": req.session.guestCart,
      message: accountDelete ?? loggedOutMessage,
    });
  }
});

app.get("/auth/check", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).send(`user: ${req.user.username}: "logged in"`);
  } else {
    return res.status(401).send("no user logged in");
  }
});

/**
 PORT LISTEN
*/

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

module.exports = app;
