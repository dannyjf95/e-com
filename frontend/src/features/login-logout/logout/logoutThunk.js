import { postThunkCreator } from "../../../utils/postThunkCreator";

export const userLogout = postThunkCreator({
  actionType: 'userSession/logout',
  apiEndpoint: "http://localhost:5000/logout",
  dataKey: null,
  method: "POST",
  headers: null,
  // body: body,
});
