import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaClipboardList, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// User Avatar Component with error handling
const UserAvatar = ({ imageUrl, name }) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);

  useEffect(() => {
    setImageSrc(imageUrl);
    setImageError(false);
  }, [imageUrl]);

  const shouldShowPlaceholder = !imageSrc || imageSrc.trim() === "" || imageError;

  return (
    <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
      {shouldShowPlaceholder ? (
        <div className="w-full h-full bg-primary text-primary-content flex items-center justify-center">
          <span className="text-xs font-bold">
            {(name || "U").charAt(0).toUpperCase()}
          </span>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={name || "User"}
          onError={() => setImageError(true)}
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};

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
        title: `Request ${status}!`,
        text: `The request has been ${status.toLowerCase()}`,
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

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === "approved") {
      return <span className="badge badge-success gap-2"><FaCheckCircle /> Approved</span>;
    } else if (statusLower === "rejected") {
      return <span className="badge badge-error gap-2"><FaTimesCircle /> Rejected</span>;
    } else {
      return <span className="badge badge-warning gap-2"><FaClock /> Pending</span>;
    }
  };

  return (
    <div className={user?.role === "hr" ? "min-h-screen bg-gradient-to-br from-accent/5 via-base-100 to-info/5 py-12 px-4" : "w-full"}>
      <div className={user?.role === "hr" ? "container mx-auto max-w-7xl" : ""}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          {user?.role === "hr" && (
            <div className="mb-8">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-accent to-info bg-clip-text text-transparent mb-2">
                All Requests
              </h2>
              <p className="text-base-content/70">Manage employee asset requests</p>
            </div>
          )}

          {/* Table Card */}
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-accent/10 to-info/10">
                  <tr>
                    <th className="text-base">Asset</th>
                    <th className="text-base">Type</th>
                    <th className="text-base">User</th>
                    <th className="text-base">Request Type</th>
                    <th className="text-base">Status</th>
                    <th className="text-base">Date</th>
                    {user?.role === "hr" && <th className="text-base">Actions</th>}
                  </tr>
                </thead>

                <tbody>
                  {requests.map((request, index) => (
                    <motion.tr
                      key={request._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td className="font-semibold">{request.assetName || "N/A"}</td>
                      <td>
                        <span className="badge badge-outline">{request.assetType || "N/A"}</span>
                      </td>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="avatar">
                            <UserAvatar
                              imageUrl={request.requesterImage}
                              name={request.requesterName}
                            />
                          </div>
                          <div>
                            <div className="font-bold">{request.requesterName || "Me"}</div>
                            <div className="text-sm text-base-content/60">
                              {request.requesterEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className="badge badge-ghost">{request.requestType || "Request"}</span>
                      </td>

                      <td>{getStatusBadge(request.requestStatus)}</td>

                      <td className="text-base-content/70">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </td>

                      {user?.role === "hr" && (
                        <td>
                          {request.requestStatus?.toLowerCase() === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleAction(request._id, "approved")}
                                className="btn btn-success btn-xs gap-1 hover:scale-105 transition-transform"
                              >
                                <FaCheckCircle />
                                Approve
                              </button>
                              <button
                                onClick={() => handleAction(request._id, "rejected")}
                                className="btn btn-error btn-xs gap-1 hover:scale-105 transition-transform"
                              >
                                <FaTimesCircle />
                                Reject
                              </button>
                            </div>
                          )}
                          {request.requestStatus?.toLowerCase() !== "pending" && (
                            <span className="text-sm text-base-content/50">No actions</span>
                          )}
                        </td>
                      )}
                    </motion.tr>
                  ))}

                  {requests.length === 0 && (
                    <tr>
                      <td colSpan={user?.role === "hr" ? "7" : "6"} className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                          <FaClipboardList className="text-6xl text-base-content/20" />
                          <p className="text-lg text-base-content/60">No requests found</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center p-6 border-t border-base-300">
                <div className="join">
                  <button
                    className="join-item btn btn-sm"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    «
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`join-item btn btn-sm ${page === pageNum ? "btn-active btn-primary" : ""
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    className="join-item btn btn-sm"
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    »
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RequestList;
