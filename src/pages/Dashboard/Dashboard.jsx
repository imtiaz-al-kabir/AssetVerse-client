import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure"; // Import if needed for other calls

import DashboardCharts from "../../components/DashboardCharts/DashboardCharts";
import RequestList from "../../components/RequestList/RequestList";

const Dashboard = () => {
  const { user, loading } = useAuth(); // getting user from context
  const navigate = useNavigate();
  // const axiosSecure = useAxiosSecure(); 

  // Redirect if not logged in (handled by PrivateRoute usually, but double check)
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!user) return null; // Should redirect

  if (!user)
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="btn btn-error btn-outline btn-sm"
        >
          Logout
        </button>
      </div>

      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title">Welcome, {user.name}!</h2>
          <p className="text-neutral-content opacity-70">
            Role: <span className="badge badge-accent">{user.role}</span>
          </p>
        </div>
      </div>

      {user.role === "hr" ? (
        <div>
          <DashboardCharts />
          <div className="card bg-neutral text-neutral-content shadow-xl">
            <div className="card-body">
              <h2 className="card-title">HR Actions</h2>
              <p>Manage Employees, Assets, and Requests from this panel.</p>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => navigate("/assets")}
                  className="btn btn-primary"
                >
                  Manage Assets
                </button>
                <button
                  onClick={() => navigate("/my-employees")}
                  className="btn btn-info"
                >
                  My Employees
                </button>
                <button
                  onClick={() => navigate("/requests")}
                  className="btn btn-secondary"
                >
                  Manage Requests
                </button>
                <button
                  onClick={() => navigate("/subscription")}
                  className="btn btn-accent"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
            {/* <button onClick={() => navigate('/requests/new')} className="btn btn-primary btn-sm">New Request</button> */}
          </div>
          <div className="bg-base-100 rounded-lg shadow p-4">
            <RequestList />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
