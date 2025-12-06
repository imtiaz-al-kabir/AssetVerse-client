import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import RegisterEmployee from "../pages/Auth/RegisterEmployee/RegisterEmployee";
import RegisterHR from "../pages/Auth/RegisterHr/RegisterHR";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import MyAssets from "../pages/MyAssets/MyAssets";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/register/employee",
        Component: RegisterEmployee,
      },
      {
        path: "/register/hr",
        Component: RegisterHR,
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/my-assets",
        Component: MyAssets,
      },
    ],
  },
]);
export default router;
