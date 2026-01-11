import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaSearch, FaFilter, FaPlus, FaTrash, FaBox } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssetList = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["assets", search, filterType, sort, page],
    queryFn: async () => {
      let query = `assets?page=${page}&limit=${limit}&`;
      if (search) query += `search=${search}&`;
      if (filterType) query += `type=${filterType}&`;
      if (sort) query += `sort=${sort}&`; // Assuming backend supports sort

      const res = await axiosSecure.get(query);
      return res.data;
    },
  });

  const assets = data?.assets || [];
  const total = data?.total || 0;
  const totalPages = data?.pages || 0;

  // ... (keep deleteMutation and handleDelete) ...
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

  useEffect(() => {
    setPage(1);
  }, [search, filterType, sort]);

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-4xl font-bold text-base-content mb-2">
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

        {/* Search, Filter, Sort */}
        <div className="bg-base-100 rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="form-control">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="input input-bordered w-full pl-10 focus:input-primary transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            {/* Filter */}
            <select
              className="select select-bordered w-full focus:select-primary"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>

            {/* Sort */}
            <select
              className="select select-bordered w-full focus:select-primary"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Default Sort</option>
              <option value="quantityAsc">Quantity (Low to High)</option>
              <option value="quantityDesc">Quantity (High to Low)</option>
              <option value="dateNew">Date (Newest)</option>
              <option value="dateOld">Date (Oldest)</option>
            </select>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="skeleton h-48 w-full rounded-2xl"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
              </div>
            ))}
          </div>
        )}

        {/* Asset Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {assets.map((asset) => (
              <div key={asset._id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border border-base-200 group">
                <figure className="h-48 overflow-hidden relative">
                  <img src={asset.productImage} alt={asset.productName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 right-2">
                    <span className={`badge ${asset.productType === "Returnable" ? "badge-warning" : "badge-info"}`}>
                      {asset.productType}
                    </span>
                  </div>
                </figure>
                <div className="card-body p-5">
                  <h2 className="card-title text-lg font-bold">{asset.productName}</h2>
                  <p className="text-sm text-base-content/70 line-clamp-2">
                    Quantity Available: <span className="font-bold text-primary">{asset.availableQuantity}</span> / {asset.productQuantity}
                  </p>
                  <div className="card-actions justify-between items-center mt-4">
                    <button onClick={() => handleDelete(asset._id)} className="btn btn-sm btn-ghost text-error hover:bg-error/10">
                      <FaTrash />
                    </button>
                    <button onClick={() => navigate(`/assets/details/${asset._id}`)} className="btn btn-sm btn-outline btn-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && assets.length === 0 && (
          <div className="text-center py-20">
            <FaBox className="text-6xl text-base-content/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-base-content/60">No Assets Found</h3>
            <p className="text-base-content/50">Try adjusting your filters or search terms.</p>
          </div>
        )}

        {/* Pagination - Kept from original logic */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="join">
              <button
                className="join-item btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                «
              </button>
              {/* Simplified Pagination for brevity - can expand if needed */}
              <button className="join-item btn">Page {page} of {totalPages}</button>
              <button
                className="join-item btn"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                »
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AssetList;
