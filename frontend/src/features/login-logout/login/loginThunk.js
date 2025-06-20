import { postThunkCreator } from "../../../utils/postThunkCreator";

// const body = {
//   username: "dan",
//   password: "dan",
// };
export const fetchUserLogin = postThunkCreator({
  actionType: "user/fetchUserLogin",
  apiEndpoint: "http://localhost:5000/account/login",
  dataKey: "user",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  // body: body,
});
