import { Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSession } from "../dummy  folder/sessionCheck/userSessionThunk";
import Spinner from "./components/customs/Spinner";
import { fetchUserLogin } from "./features/login-logout/login/loginThunk";

//spinner

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //auto loggerinner
    // dispatch(fetchUserLogin({ email: "dan", password: "dan@dan.com" }));
    dispatch(fetchUserSession());
  }, [dispatch]);

  const { userAuthLoading } = useSelector((state) => state.userAuth);

  if (userAuthLoading) return <div>Loading...</div>;

  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
