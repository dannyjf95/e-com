import { Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSession } from "./features/login-logout/sessionCheck/userSessionThunk";

function App() {
  const dispatch = useDispatch();

  // useEffect(() => {}, []);

  useEffect(() => {
    dispatch(fetchUserSession());
    // console.log("dispatched");
  }, [dispatch]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
