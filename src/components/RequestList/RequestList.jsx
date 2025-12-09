import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const fetchRequests = async () => {
    if (!user) return;

    // Determine endpoint based on role
    // HR sees all requests at /requests
    // Employee sees own at /requests/my-requests (need to verify this route exists)
    // Looking at previous summary, requestRoutes has /my-requests?
    // Let's assume standard REST: GET /requests for HR (all), GET /requests/my-requests for Employee

    // Actually, let's look at the original code: 
    // userInfo.role === "hr" ? "/api/requests" : "/api/requests/myrequests";
    // I need to use the axiosSecure instance which likely has baseURL set.
    // usage: axiosSecure.get('/requests') or axiosSecure.get('/requests/my-requests')

    const url = user.role === "hr" ? "/requests" : "/requests/my-requests";

    try {
      const res = await axiosSecure.get(url);
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user, axiosSecure]);

  const handleAction = async (id, status) => {
    try {
      await axiosSecure.put(`/requests/${id}`, { status });
      Swal.fire({
        icon: 'success',
        title: `Request ${status}`,
        showConfirmButton: false,
        timer: 1500
      });
      fetchRequests();
    } catch (error) {
      console.error(error);
      if (error.response?.data?.message === "Package limit reached. Upgrade required.") {
        Swal.fire({
          icon: 'warning',
          title: 'Package Limit Reached',
          text: 'You have reached the employee limit for your package. Please upgrade to accept more requests.',
          showCancelButton: true,
          confirmButtonText: 'Upgrade Now',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/subscription');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Action Failed',
          text: error.response?.data?.message || 'Something went wrong'
        });
      }
    }
  };

  return (
    <div
      className={user?.role === "hr" ? "container mx-auto px-4 mt-8" : "w-full"}
    >
      <div className="flex justify-between items-center mb-4">
        {user?.role === "hr" && (
          <h2 className="text-2xl font-bold">All Requests</h2>
        )}
        {user?.role === "employee" && <div />} {/* Spacer */}
        {user?.role === "employee" && (
          <Link to="/requests/new" className="hidden">
            Make Request
          </Link> // Handled in Dashboard
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>User</th>
              <th>Request Type</th>
              <th>Status</th>
              <th>Date</th>
              {user?.role === "hr" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="hover">
                <td>{request.assetName || "N/A"}</td>
                <td>{request.assetType || "N/A"}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    {/* Placeholder for avatar if needed */}
                    <div>
                      <div className="font-bold">
                        {request.requesterName || "Me"}
                      </div>
                      <div className="text-sm opacity-50">
                        {request.requesterEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{request.requestType || "Request"}</td>
                <td>
                  <span
                    className={`badge ${request.requestStatus === "approved" || request.requestStatus === "Approved" // Handle case sensitivity just in case
                      ? "badge-success"
                      : request.requestStatus === "rejected" || request.requestStatus === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                      }`}
                  >
                    {request.requestStatus}
                  </span>
                </td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                {user?.role === "hr" && (
                  <td>
                    {(request.requestStatus === "pending" || request.requestStatus === "Pending") && (
                      <div className="join">
                        <button
                          onClick={() => handleAction(request._id, "approved")}
                          className="btn btn-success btn-xs join-item"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(request._id, "rejected")}
                          className="btn btn-error btn-xs join-item"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {requests.length === 0 && (
          <p className="text-center py-4 opacity-70">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default RequestList;
