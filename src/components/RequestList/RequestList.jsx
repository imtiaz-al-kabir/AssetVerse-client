import { useEffect, useState } from "react";
import { Link } from "react-router";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    fetchRequests(userInfo);
  }, []);

  const fetchRequests = async (userInfo) => {
    if (!userInfo) return;

    const url =
      userInfo.role === "HR" ? "/api/requests" : "/api/requests/myrequests";
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setRequests(data);
      } else {
        console.error("Failed to fetch requests");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (id, status) => {
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        fetchRequests(user);
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={user?.role === "HR" ? "container mx-auto px-4 mt-8" : "w-full"}
    >
      <div className="flex justify-between items-center mb-4">
        {user?.role === "HR" && (
          <h2 className="text-2xl font-bold">All Requests</h2>
        )}
        {user?.role === "Employee" && <div />} {/* Spacer */}
        {user?.role === "Employee" && (
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
              {user?.role === "HR" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id} className="hover">
                <td>{request.assetId?.name || "N/A"}</td>
                <td>{request.assetId?.type || "N/A"}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                        <span className="text-xs">
                          {request.userId?.name?.charAt(0) || "U"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">
                        {request.userId?.name || "Me"}
                      </div>
                      <div className="text-sm opacity-50">
                        {request.userId?.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{request.requestType}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === "Approved"
                        ? "badge-success"
                        : request.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                {user?.role === "HR" && (
                  <td>
                    {request.status === "Pending" && (
                      <div className="btn-group">
                        <button
                          onClick={() => handleAction(request._id, "Approved")}
                          className="btn btn-success btn-xs"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction(request._id, "Rejected")}
                          className="btn btn-error btn-xs"
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
