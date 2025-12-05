import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";

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
        path:"/login" ,Component:Login
      }
    ],
  },
]);
export default router;
