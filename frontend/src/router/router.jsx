import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
//components
const RootLayout = React.lazy(() => import("./RouteLayout"));

const Items = React.lazy(() => import("../features/items/Items"));
const Cart = React.lazy(() => import("../features/cart/Cart"));
const Login = React.lazy(() => import("../features/login-logout/login/Login"));
const Categories = React.lazy(() => import("../features/categories/Categories"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public route: Login */}
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading login...</div>}>
            <Login />
          </Suspense>
        }
      />

      {/* Protected / main app routes */}
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading app...</div>}>
            <RootLayout />
          </Suspense>
        }
      >
        <Route path="categories/:catname/:subcatname" element={<Items />} />
        <Route path="cart" element={<Cart />} />
        <Route path="categories" element={<Categories />} />
        {/* other nested routes */}
      </Route>
    </>
  )
);


export default router;
