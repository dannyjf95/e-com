const validateCard = (req, res, next) => {
  const credit = 50;
  const card = ["1234", "1234", "1234", "1234"];
  const validCard = card.reduce((acc, curr) => acc + curr).length === 16;
  if (!validCard) {
    return res.status(403).json({ message: "Invalid card" });
  }

  req.cash = credit;
  next();
};

const validateCart = (req, res, next) => {
  const cart = req.user ? req.session.userCart : req.session.guestCart;

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "No cart to checkout" });
  }
  req.cart = cart;
  next();
};

module.exports = {
  validateCard,
  validateCart,
};
