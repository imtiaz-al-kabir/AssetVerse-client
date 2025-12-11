import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const fetchRequests = async () => {
    if (!user) return;

    const url = user.role === "hr" ? "/requests" : "/requests/my-requests";

    try {
      const res = await axiosSecure.get(url, {
        params: { page, limit },
      });

      setRequests(res.data.requests || res.data);
      setTotal(res.data.total || res.data.length || 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user, page]);

  const handleAction = async (id, status) => {
    try {
      await axiosSecure.put(`/requests/${id}`, { status });
      Swal.fire({
        icon: "success",
        title: `Request ${status}`,
        showConfirmButton: false,
        timer: 1500,
      });
      fetchRequests();
    } catch (error) {
      console.error(error);
      if (
        error.response?.data?.message ===
        "Package limit reached. Upgrade required."
      ) {
        Swal.fire({
          icon: "warning",
          title: "Package Limit Reached",
          text: "You have reached the employee limit for your package. Please upgrade to accept more requests.",
          showCancelButton: true,
          confirmButtonText: "Upgrade Now",
          cancelButtonText: "Cancel",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/subscription");
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Action Failed",
          text: error.response?.data?.message || "Something went wrong",
        });
      }
    }
  };

  return (
    <div
      className={
        user?.role === "hr" ? "container mx-auto pb-10 px-4 mt-8" : "w-full"
      }
    >
      <div className="flex justify-between items-center mb-4">
        {user?.role === "hr" && (
          <h2 className="text-2xl font-bold">All Requests</h2>
        )}
        {user?.role === "employee" && <div />}
        {user?.role === "employee" && (
          <Link to="/requests/new" className="hidden">
            Make Request
          </Link>
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
                    className={`badge ${
                      request.requestStatus?.toLowerCase() === "approved"
                        ? "badge-success"
                        : request.requestStatus?.toLowerCase() === "rejected"
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
                    {request.requestStatus?.toLowerCase() === "pending" && (
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

        <div className="flex justify-center mt-6 gap-4 items-center">
          {/* Previous */}
          <button
            className="btn btn-outline btn-sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>

          {/* Page numbers */}
          <div className="join">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`join-item btn btn-sm ${
                  page === i + 1 ? "btn-active" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            className="btn btn-outline btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestList;
