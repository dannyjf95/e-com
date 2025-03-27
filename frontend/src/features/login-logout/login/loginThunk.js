import { thunkCreator } from "../../../utils/thunkCreator";

const body = {
  username: "dan",
  password: "dan",
};
export const fetchUserLogin = thunkCreator({
  actionType: "user/fetchUserLogin",
  apiEndpoint: "http://localhost:5000/account/login",
  dataKey: "user",
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: body,
});
