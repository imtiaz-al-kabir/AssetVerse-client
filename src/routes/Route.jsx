import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import RegisterEmployee from "../pages/Auth/RegisterEmployee/RegisterEmployee";
import RegisterHR from "../pages/Auth/RegisterHr/RegisterHR";
import Home from "../pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
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
        path: "register/hr",
        Component: RegisterHR,
      },
    ],
  },
]);
export default router;
