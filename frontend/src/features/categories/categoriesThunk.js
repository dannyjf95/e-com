import { thunkCreator } from "../../utils/thunkCreator";
const API_CATEGORIES = "http://localhost:5000/categories";

export const fetchCategories = thunkCreator({
  actionType: "categories/fetchCategories",
  apiEndpoint: API_CATEGORIES,
  dataKey: "categories",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
  params: null,
});

// export const fetchSubCatItems = thunkCreator({
//   actionType: "categories/fetchSubCategories",
//   apiEndpoint: API_CATEGORIES,
//   dataKey: "categories",
//   method: "GET",
//   headers: { "Content-Type": "application/json" },
//   body: null,
//   params: null,
// });
