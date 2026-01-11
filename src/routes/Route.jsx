import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import AssetForm from "../components/AssetForm/AssetForm";
import AssetList from "../components/AssetList/AssetList";
import RequestForm from "../components/RequestForm/RequestForm";
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
import Profile from "../pages/Profile/Profile";
import RequestAsset from "../pages/RequestAsset/RequestAsset";
import PaymentSuccess from "../pages/Subscription/PaymentSuccess";
import Subscription from "../pages/Subscription/Subscription";
import AssetDetails from "../pages/AssetDetails/AssetDetails";
import AboutPage from "../pages/About/AboutPage";
import Contact from "../pages/Contact/Contact";
import Blog from "../pages/Blog/Blog";
import Privacy from "../pages/Legal/Privacy";
import Terms from "../pages/Legal/Terms";

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
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },

      {
        path: "/my-assets",
        element: (
          <PrivateRoute>
            <MyAssets />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-team",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
      {
        path: "/request-asset",
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/requests",
        element: (
          <PrivateRoute>
            <RequestList />
          </PrivateRoute>
        ),
      },
      {
        path: "/requests/new",
        element: (
          <PrivateRoute>
            <RequestForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-employees",
        element: (
          <PrivateRoute>
            <MyEmployeeList />
          </PrivateRoute>
        ),
      },
      {
        path: "/assets",
        element: (
          <PrivateRoute>
            <AssetList />
          </PrivateRoute>
        ),
      },
      {
        path: "/assets/add",
        element: (
          <PrivateRoute>
            <AssetForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/assets/details/:id",
        element: (
          <PrivateRoute>
            <AssetDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        Component: AboutPage,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/blog",
        Component: Blog,
      },
      {
        path: "/privacy",
        Component: Privacy,
      },
      {
        path: "/terms",
        Component: Terms,
      },
      {
        path: "/subscription",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
