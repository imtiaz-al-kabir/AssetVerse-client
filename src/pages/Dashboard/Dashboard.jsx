import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import DashboardCharts from "../../components/DashboardCharts/DashboardCharts";
import RequestList from "../../components/RequestList/RequestList";
import {
  FiHome,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiBox,
  FiUsers,
  FiClipboard,
  FiCreditCard,
} from "react-icons/fi";
import Loading from "../Loading/Loading";

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !user) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`flex flex-col bg-secondary text-white transition-all duration-300 ${
          drawerOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo / toggle */}
        <div className="flex items-center justify-between p-4 border-b border-base-300">
          {drawerOpen && <span className="text-lg font-bold">AssetVerse</span>}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="btn btn-ghost btn-square"
          >
            {drawerOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Sidebar menu */}
        <ul className="menu flex-1 p-2 gap-2 ">
          {/* Dashboard Home */}
          <li>
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 p-2 rounded hover:bg-base-300 w-full"
            >
              <FiHome size={20} />
              {drawerOpen && <span>Dashboard</span>}
            </button>
          </li>

          {/* HR Routes (show only for HR) */}
          {user.role === "hr" && (
            <>
              <li>
                <button
                  onClick={() => navigate("/assets")}
                  className="flex items-center gap-2 p-2 rounded hover:bg-base-300 w-full"
                >
                  <FiBox size={20} />
                  {drawerOpen && <span>Manage Assets</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/my-employees")}
                  className="flex items-center gap-2 p-2 rounded hover:bg-base-300 w-full"
                >
                  <FiUsers size={20} />
                  {drawerOpen && <span>My Employees</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/requests")}
                  className="flex items-center gap-2 p-2 rounded hover:bg-base-300 w-full"
                >
                  <FiClipboard size={20} />
                  {drawerOpen && <span>Manage Requests</span>}
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/subscription")}
                  className="flex items-center gap-2 p-2 rounded hover:bg-base-300 w-full"
                >
                  <FiCreditCard size={20} />
                  {drawerOpen && <span>Subscribe</span>}
                </button>
              </li>
            </>
          )}

          {/* Settings */}
          <li>
            <button
              onClick={() => navigate("/settings")}
              className="flex items-center gap-2 p-2 rounded hover:bg-base-300 w-full"
            >
              <FiSettings size={20} />
              {drawerOpen && <span>Settings</span>}
            </button>
          </li>

          {/* Logout */}
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 rounded hover:bg-red-500 hover:text-white w-full"
            >
              <FiLogOut size={20} />
              {drawerOpen && <span>Logout</span>}
            </button>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Navbar */}
        <nav className="navbar bg-primary text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="btn btn-ghost btn-square lg:hidden"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
        </nav>

        <main className="flex-1 p-15 bg-base-100 overflow-auto space-y-6">
          {/* Welcome card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Welcome, {user.name}!</h2>
              <p className="text-neutral-content opacity-70">
                Role: <span className="badge badge-accent">{user.role}</span>
              </p>
            </div>
          </div>

          {/* HR or user dashboard */}
          {user.role === "hr" ? (
            <DashboardCharts />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => navigate("/my-assets")}
                  className="btn btn-primary h-24 text-lg"
                >
                  My Assets
                </button>
                <button
                  onClick={() => navigate("/request-asset")}
                  className="btn btn-secondary h-24 text-lg"
                >
                  Request Asset
                </button>
                <button
                  onClick={() => navigate("/my-team")}
                  className="btn btn-accent h-24 text-lg"
                >
                  My Team
                </button>
              </div>

              <div className="flex justify-between items-end">
                <h3 className="text-xl font-semibold">My Pending Requests</h3>
              </div>

              <div className="bg-base-100 rounded-lg shadow p-4">
                <RequestList />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
