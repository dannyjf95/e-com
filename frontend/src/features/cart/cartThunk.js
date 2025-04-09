import { deleteThunkCreator } from "../../utils/deleteThunkCreator";
import { getThunkCreator } from "../../utils/getThunkCreator";
import { postThunkCreator } from "../../utils/postThunkCreator";
const API_CART = "http://localhost:5000/cart";

export const fetchCart = getThunkCreator({
  actionType: "cart/fetchCart",
  apiEndpoint: `${API_CART}/view`,
  dataKey: null,
});

export const addToCart = postThunkCreator({
  actionType: "cart/addToCart",
  apiEndpoint: `${API_CART}/add`,
  dataKey: null,
});

export const deleteFromCart = deleteThunkCreator({
  actionType: "cart/removeFromCart",
  apiEndpoint: `${API_CART}/items/`,
});
