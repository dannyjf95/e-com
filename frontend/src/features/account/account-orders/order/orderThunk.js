import { getThunkCreator } from "../../../../utils/getThunkCreator";
const API_CATEGORIES = "http://localhost:5000/users/1/orders";

export const fetchUserOrder = getThunkCreator({
  actionType: "userOrders/fetchUserOrder",
  apiEndpoint: API_CATEGORIES,
  method: "GET",
  headers: { "Content-Type": "application/json" },
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
