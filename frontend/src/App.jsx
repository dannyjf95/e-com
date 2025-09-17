import { Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import router from "./router/router";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserSession } from "../dummy  folder/sessionCheck/userSessionThunk";
import Spinner from "./components/customs/Spinner";

//spinner

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //auto loggerinner
    // dispatch(fetchUserLogin({ username: "dan", password: "dan" }));
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
