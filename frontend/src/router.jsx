import React from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
//components
import Root from "./components/Routes";
import Counter from "./components/Counter";
// import Hero from "./components/Hero";
import Items from "./components/Items";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      {/* <Route index element={<Hero />} /> */}
      <Route path="counter" element={<Counter />} />
      <Route path="/items/all" element={<Items />} />
    </Route>
  )
);
