import { thunkCreator } from "../../utils/thunkCreator";
const API_CART = "http://localhost:5000/cart/view";

export const fetchCart = thunkCreator({
  actionType: "cart/fetchCart",
  apiEndpoint: API_CART,
  dataKey: null,
  method: "GET",
  body: null,
});
