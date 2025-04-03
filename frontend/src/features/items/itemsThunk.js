import { getThunkCreator } from "../../utils/getThunkCreator";
const API_ITEMS = "http://localhost:5000/categories";

// export const fetchItems = getThunkCreator({
//   actionType: "items/fetchItems",
//   apiEndpoint: "http://localhost:5000/categories",
// });

export const fetchItems = getThunkCreator({
  actionType: "items/fetchItems",
  apiEndpoint: API_ITEMS,
  dataKey: "items",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
  
});
