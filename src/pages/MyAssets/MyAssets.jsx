import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaSearch, FaFilter, FaPrint, FaBox, FaUndo } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const MyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const axiosSecure = useAxiosSecure();

  const fetchAssets = async () => {
    try {
      let query = `/assigned-assets?page=${page}&limit=${limit}`;
      if (search) query += `&search=${search}`;
      if (filterType) query += `&type=${filterType}`;

      const res = await axiosSecure.get(query);
      setAssets(res.data.assets || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [search, filterType, page]);

  const handlePrint = () => {
    window.print();
  };

  const handleReturn = async (assetId) => {
    try {
      const result = await Swal.fire({
        title: "Return Asset?",
        text: "This will send a return request to HR.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, return it!",
      });

      if (result.isConfirmed) {
        const res = await axiosSecure.post("/requests", {
          assetId: assetId,
          requestType: "Return",
          note: "Returning asset",
        });

        if (res.status === 201 || res.status === 200) {
          Swal.fire("Requested!", "Return request sent to HR.", "success");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to send request",
        "error"
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-base-100 to-info/5 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-success to-info bg-clip-text text-transparent mb-2">
                My Assets
              </h2>
              <p className="text-base-content/70">View and manage your assigned assets</p>
            </div>
            <button
              onClick={handlePrint}
              className="btn btn-outline gap-2 hover:scale-105 transition-transform"
            >
              <FaPrint />
              Print List
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaSearch className="text-success" />
                    Search Assets
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Search my assets..."
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-success transition-all"
                  value={search}
                  onChange={(e) => {
                    setPage(1);
                    setSearch(e.target.value);
                  }}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaFilter className="text-success" />
                    Filter by Type
                  </span>
                </label>
                <select
                  className="select select-bordered focus:outline-none focus:ring-2 focus:ring-success transition-all"
                  value={filterType}
                  onChange={(e) => {
                    setPage(1);
                    setFilterType(e.target.value);
                  }}
                >
                  <option value="">All Types</option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead className="bg-gradient-to-r from-success/10 to-info/10">
                  <tr>
                    <th className="text-base">Image</th>
                    <th className="text-base">Name</th>
                    <th className="text-base">Type</th>
                    <th className="text-base">Company</th>
                    <th className="text-base">Assigned Date</th>
                    <th className="text-base">Status</th>
                    <th className="text-base">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {assets.map((asset, index) => (
                    <motion.tr
                      key={asset._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-base-200 transition-colors"
                    >
                      <td>
                        <div className="avatar">
                          <div className="mask mask-squircle w-14 h-14 ring ring-success ring-offset-2 ring-offset-base-100">
                            <img
                              src={
                                asset.productImage ||
                                asset.assetImage ||
                                "https://via.placeholder.com/150"
                              }
                              alt={asset.productName}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="font-bold">
                        {asset.productName || asset.assetName}
                      </td>

                      <td>
                        <span className="badge badge-outline">
                          {asset.productType || asset.assetType}
                        </span>
                      </td>

                      <td className="text-base-content/70">{asset.companyName || "N/A"}</td>

                      <td className="text-base-content/70">
                        {new Date(
                          asset.dateAdded || Date.now()
                        ).toLocaleDateString()}
                      </td>

                      <td>
                        <span className="badge badge-success gap-2">
                          Assigned
                        </span>
                      </td>

                      <td>
                        {(asset.productType === "Returnable" ||
                          asset.assetType === "Returnable") && (
                            <button
                              onClick={() => handleReturn(asset.assetId)}
                              className="btn btn-warning btn-sm gap-2 hover:scale-105 transition-transform"
                            >
                              <FaUndo />
                              Return
                            </button>
                          )}
                      </td>
                    </motion.tr>
                  ))}

                  {assets.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                          <FaBox className="text-6xl text-base-content/20" />
                          <p className="text-lg text-base-content/60">No assets assigned yet</p>
                          <button
                            onClick={() => window.location.href = "/request-asset"}
                            className="btn btn-primary btn-sm"
                          >
                            Request Your First Asset
                          </button>
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
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setPage(index + 1)}
                      className={`join-item btn btn-sm ${page === index + 1 ? "btn-active btn-primary" : ""
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}
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

export default MyAssets;
