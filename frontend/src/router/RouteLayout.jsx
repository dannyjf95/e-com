import React, { useEffect } from "react";

import { Outlet } from "react-router-dom";
import Hero from "../components/Hero";

export default function RootLayout() {
  return (
    <>
      <Hero />
      <Outlet />
    </>
  );
}
