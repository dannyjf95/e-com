import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
//components
const RootLayout = React.lazy(() => import("./RouteLayout"));
const Counter = React.lazy(() => import("../features/counter/Counter"));
const Items = React.lazy(() => import("../features/items/Items"));
const Cart = React.lazy(() => import("../features/cart/cart"));
const Login = React.lazy(() => import("../features/login/Login"));
const Categories = React.lazy(() => import("../features/categories/Categories"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <RootLayout />
        </Suspense>
      }
    >
      {/* <Route index element={<Hero />} /> */}
      <Route path="counter" element={<Counter />} />
      <Route path="items/all" element={<Items />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="categories" element={<Categories />} />
    </Route>
  )
);
