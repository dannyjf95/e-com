import { getThunkCreator } from "../../../utils/getThunkCreator";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchUserOrders = getThunkCreator({
  actionType: "userOrders/fetchUserOrders",
  apiEndpoint: API_BASE_URL,
  dataKey: null,
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
  params: null,
});
