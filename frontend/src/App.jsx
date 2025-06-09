import { Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSession } from "./features/login-logout/sessionCheck/userSessionThunk";
import { selectUserSession } from "./features/login-logout/sessionCheck/userSessionSlice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserSession());
  }, [dispatch]);
  
  const { sessionLoading } = useSelector((state) => state.user);

  if (sessionLoading) return <div>Loading session...</div>;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
