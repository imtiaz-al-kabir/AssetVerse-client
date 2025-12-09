import { createBrowserRouter } from "react-router";
import AssetForm from "../components/AssetForm/AssetForm";
import AssetList from "../components/AssetList/AssetList";
import RequestList from "../components/RequestList/RequestList";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import RegisterEmployee from "../pages/Auth/RegisterEmployee/RegisterEmployee";
import RegisterHR from "../pages/Auth/RegisterHr/RegisterHR";
import Dashboard from "../pages/Dashboard/Dashboard";
import Home from "../pages/Home/Home/Home";
import MyAssets from "../pages/MyAssets/MyAssets";
import MyEmployeeList from "../pages/MyEmployeeList/MyEmployeeList";
import MyTeam from "../pages/MyTeam/MyTeam";
import NotFound from "../pages/NotFound/NotFound";
import RequestAsset from "../pages/RequestAsset/RequestAsset";
import RequestForm from "../components/RequestForm/RequestForm";
import Profile from "../pages/Profile/Profile";
import Subscription from "../pages/Subscription/Subscription";
import PaymentSuccess from "../pages/Subscription/PaymentSuccess";

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
      {
        path: "/my-team",
        Component: MyTeam,
      },
      {
        path: "/request-asset",
        Component: RequestAsset,
      },
      {
        path: "/requests",
        Component: RequestList,
      },
      {
        path: "/requests/new",
        Component: RequestForm,
      },
      {
        path: "/my-employees",
        Component: MyEmployeeList,
      },
      {
        path: "/assets",
        Component: AssetList,
      },
      {
        path: "/assets/add",
        Component: AssetForm,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/subscription",
        Component: Subscription,
      },
      {
        path: "/payment/success",
        Component: PaymentSuccess,
      },

    ],
  },
]);
export default router;
