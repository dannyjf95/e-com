import React, { Suspense } from "react";
import { Navigate, Route, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
// import Logout from "../features/login-logout/logout/Logout";

//spinner
import Spinner from "../components/customs/Spinner";
//components
const RootLayout = React.lazy(() => import("./RouteLayout"));
//auth
const Login = React.lazy(() => import("../features/login-logout/login/Login"));
const LogOut = React.lazy(() => import("../features/login-logout/logout/LogOut"));
const Register = React.lazy(() => import("../features/register/Register"));
// guest/user shopping & cart
const Items = React.lazy(() => import("../features/items/Items"));
const Cart = React.lazy(() => import("../features/cart/Cart"));
const Categories = React.lazy(() => import("../features/categories/Categories"));

// account and nested
const Account = React.lazy(() => import("../features/account/Account"));
const UserAccount = React.lazy(() => import("../features/account/user-account/UserAccount"));
const Orders = React.lazy(() => import("../features/account/account-orders/Orders"));
const OrdersList = React.lazy(() => import("../features/account/account-orders/OrdersList"));
const OrderSummary = React.lazy(() => import("../features/account/account-orders/order/OrderSummary"));

//router to be used with outlet in RouteLayout which ever path is matched will be  child rendered as "outlet"
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* unknown  paths */}
      <Route
        path="*"
        element={
          <div>
            <Navigate to="/" />
          </div>
        }
      />
      {/*  */}
      {/* Protected / main app routes */}
      <Route
        path="/"
        element={
          <Suspense fallback={<div></div>}>
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

      {/* Public route: Login/ Register */}
      <Route
        path="/login"
        element={
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
            <Login />
          </Suspense>
        }
      />

      <Route
        path="/register"
        element={
          <Suspense
            fallback={
              <div>
                {" "}
                <Spinner />
              </div>
            }
          >
            <Register />
          </Suspense>
        }
      />

      {/* Private access: account*/}
      <Route
        path="/account"
        element={
          <Suspense
            fallback={
              <div>
                <Spinner />
              </div>
            }
          >
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
        <Route
          path="my-account"
          element={
            <Suspense fallback={<div>Loading Account...</div>}>
              <UserAccount />
            </Suspense>
          }
        ></Route>
      </Route>

      {/* logout */}
      <Route path="/logout" element={<LogOut />}></Route>
    </>
  )
);

export default router;
