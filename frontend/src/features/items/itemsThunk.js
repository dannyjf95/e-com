import { thunkCreator } from "../../utils/thunkCreator";
const API_ITEMS = import.meta.env.VITE_API_ENDPOINT_ITEMS;

export const fetchItems = thunkCreator({
  thunktype: "items/fetchItems",
  apiEndpoint: API_ITEMS,
  dataKey: "items",
  method: "GET",
  body: null,
});
