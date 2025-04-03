import { getThunkCreator } from "../../utils/getThunkCreator";
import { postThunkCreator } from "../../utils/postThunkCreator";
const API_CART = "http://localhost:5000/cart";

export const fetchCart = getThunkCreator({
  actionType: "cart/fetchCart",
  apiEndpoint: `${API_CART}/view`,
  dataKey: null,
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
});

export const addToCart = postThunkCreator({
  actionType: "cart/addToCart",
  apiEndpoint: `${API_CART}/add`,
  dataKey: null,
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: null,
});
