import { Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  // const state = useSelector((state) => state);
  
  //   console.log(state);
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
