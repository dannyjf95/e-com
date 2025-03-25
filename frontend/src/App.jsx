import { Suspense } from "react";
import "./App.css";
import { router } from "./router/router";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
export default App;
