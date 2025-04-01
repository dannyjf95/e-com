import { thunkCreator } from "../../utils/thunkCreator";
const API_ITEMS = "http://localhost:5000/categories";

export const fetchItems = thunkCreator({
  actionType: "items/fetchItems",
  apiEndpoint: API_ITEMS,
  dataKey: "items",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
  params: ":catname/:subcatname",
});
