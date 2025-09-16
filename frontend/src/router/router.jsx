import React, { Suspense } from "react";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Logout from "../features/login-logout/logout/Logout";

//components
const RootLayout = React.lazy(() => import("./RouteLayout"));

const Items = React.lazy(() => import("../features/items/Items"));
const Cart = React.lazy(() => import("../features/cart/Cart"));
const Login = React.lazy(() => import("../features/login-logout/login/Login"));
const Categories = React.lazy(() => import("../features/categories/Categories"));
// account and nested
const Account = React.lazy(() => import("../features/account/Account"));
const Orders = React.lazy(() => import("../features/account/account-orders/Orders"));
const OrdersList = React.lazy(() => import("../features/account/account-orders/OrdersList"));
const OrderSummary = React.lazy(() => import("../features/account/account-orders/order/OrderSummary"));
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Protected / main app routes */}
      <Route
        path="/"
        element={
          <Suspense fallback={<div>Loading ...</div>}>
            <RootLayout />
          </Suspense>
        }
      >
        <Route path="categories/:catname/:subcatname" element={<Items />} />

        {/* <Route path="categories" element={<Categories />} /> */}
        {/* other nested routes */}
      </Route>

      {/* added indepent cart  page for  now */}
      <Route>
        <Route path="cart" element={<Cart />} />
      </Route>
      {/*  */}

      {/* Public route: Login */}
      <Route
        path="/login"
        element={
          <Suspense fallback={<div>Loading login...</div>}>
            <Login />
          </Suspense>
        }
      />
      {/* Private access: account*/}
      <Route
        path="/account"
        element={
          <Suspense fallback={<div>Loading profile...</div>}>
            <Account />
          </Suspense>
        }
      >
        <Route
          path="orders"
          element={
            <Suspense fallback={<div>Loading Orders...</div>}>
              <Orders />
            </Suspense>
          }
        >
          <Route index element={<OrdersList />} />
          <Route path=":id" element={<OrderSummary />} />
        </Route>
      </Route>
      {/* logout */}
      <Route path="/logout" element={<Logout />}></Route>
    </>
  )
);

export default router;
