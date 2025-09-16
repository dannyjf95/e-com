import { Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSession } from "../dummy  folder/sessionCheck/userSessionThunk";
// import { selectUserSession } from "./features/login-logout/sessionCheck/userSessionSlice";
// import { fetchUserLogin } from "./features/login-logout/login/loginThunk";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(fetchUserLogin({ username: "dan", password: "dan" }));
    dispatch(fetchUserSession());
  }, [dispatch]);

  const { userAuthLoading } = useSelector((state) => state.userAuth);

  if (userAuthLoading) return <div>Loading session...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
