import { postThunkCreator } from "../../utils/postThunkCreator";



export const fetchUserRegister = postThunkCreator({
  actionType: "user/registerUser",
  apiEndpoint: "http://localhost:5000/users/register",
  dataKey: null,
  method: "POST",
  headers: { "Content-Type": "application/json" },
});