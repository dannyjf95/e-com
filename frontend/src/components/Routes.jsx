import React from "react";

import { Outlet } from "react-router-dom";
import Hero from "./Hero";

export default function Root() {
  return (
    <>
      <Hero />
      <Outlet />
    </>
  );
}
