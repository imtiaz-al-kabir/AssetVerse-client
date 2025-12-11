import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaSearch, FaFilter, FaPlus, FaTrash, FaBox } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssetList = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["assets", search, filterType, page],
    queryFn: async () => {
      let query = `assets?page=${page}&limit=${limit}&`;
      if (search) query += `search=${search}&`;
      if (filterType) query += `type=${filterType}&`;

      const res = await axiosSecure.get(query);
      return res.data;
    },
  });

  const assets = data?.assets || [];
  const total = data?.total || 0;
  const totalPages = data?.pages || 0;

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/assets/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Deleted!", "Asset has been removed.", "success");
      queryClient.invalidateQueries(["assets"]);
    },
    onError: () => {
      Swal.fire("Error!", "Failed to delete asset.", "error");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This asset will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Reset page to 1 when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, filterType]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                Asset Inventory
              </h2>
              <p className="text-base-content/70">Manage your company's assets</p>
            </div>
            <button
              onClick={() => navigate("/assets/add")}
              className="btn btn-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all gap-2"
            >
              <FaPlus />
              Add New Asset
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaSearch className="text-primary" />
                    Search Assets
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="input ml-2 input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaFilter className="text-primary" />
                    Filter by Type
                  </span>
                </label>
                <select
                  className="select ml-2 select-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
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
                <thead className="bg-gradient-to-r from-primary/10 to-secondary/10">
                  <tr>
                    <th className="text-base">Image</th>
                    <th className="text-base">Name</th>
                    <th className="text-base">Type</th>
                    <th className="text-base">Quantity</th>
                    <th className="text-base">Date Added</th>
                    <th className="text-base">Actions</th>
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
                          <div className="mask mask-squircle w-14 h-14 ring ring-primary ring-offset-2 ring-offset-base-100">
                            <img src={asset.productImage} alt={asset.productName} />
                          </div>
                        </div>
                      </td>

                      <td className="font-bold text-base">{asset.productName}</td>

                      <td>
                        <div
                          className={`badge badge-lg ${asset.productType === "Returnable"
                            ? "badge-warning"
                            : "badge-info"
                            }`}
                        >
                          {asset.productType}
                        </div>
                      </td>

                      <td>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{asset.availableQuantity}</span>
                          <span className="text-base-content/60">/ {asset.productQuantity}</span>
                        </div>
                      </td>

                      <td className="text-base-content/70">
                        {new Date(asset.dateAdded).toLocaleDateString()}
                      </td>

                      <td>
                        <button
                          onClick={() => handleDelete(asset._id)}
                          className="btn btn-error btn-sm gap-2 hover:scale-105 transition-transform"
                        >
                          <FaTrash />
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}

                  {assets.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-12">
                        <div className="flex flex-col items-center gap-4">
                          <FaBox className="text-6xl text-base-content/20" />
                          <p className="text-lg text-base-content/60">No assets found</p>
                          <button
                            onClick={() => navigate("/assets/add")}
                            className="btn btn-primary btn-sm"
                          >
                            Add Your First Asset
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

export default AssetList;
