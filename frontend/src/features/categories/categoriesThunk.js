import { getThunkCreator } from "../../utils/getThunkCreator";
const API_CATEGORIES = "http://localhost:5000/categories";

export const fetchCategories = getThunkCreator({
  actionType: "categories/fetchCategories",
  apiEndpoint: API_CATEGORIES,
  dataKey: "categories",
  method: "GET",
  headers: { "Content-Type": "application/json" },
  body: null,
  params: null,
});

// export const fetchSubCatItems = getThunkCreator({
//   actionType: "categories/fetchSubCategories",
//   apiEndpoint: API_CATEGORIES,
//   dataKey: "categories",
//   method: "GET",
//   headers: { "Content-Type": "application/json" },
//   body: null,
//   params: null,
// });
