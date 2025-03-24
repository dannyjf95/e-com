import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
//components
import Root from "./RouteLayout";
import Counter from "../features/counter/Counter";
// import Hero from "./components/Hero";
import Items from "../features/items/Items";
import Cart from "../features/cart/cart";
import Login from "../features/login/Login";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* <Route index element={<Hero />} /> */}
      <Route path="counter" element={<Counter />} />
      <Route path="/items/all" element={<Items />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);
