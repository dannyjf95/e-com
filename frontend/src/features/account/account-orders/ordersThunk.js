import { getThunkCreator } from "../../../utils/getThunkCreator";

const API_CATEGORIES = "http://localhost:5000/users/1/orders";

export const fetchUserOrders = getThunkCreator({
  actionType: "userOrders/fetchUserOrders",
  apiEndpoint: API_CATEGORIES,
  dataKey: null,
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
  params: null,
});
