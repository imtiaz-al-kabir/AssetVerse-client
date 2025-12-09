import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssetList = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["assets", search, filterType],
    queryFn: async () => {
      let query = "assets?";
      if (search) query += `search=${search}&`;
      if (filterType) query += `type=${filterType}&`;

      const res = await axiosSecure.get(query);
      return res.data.assets || [];
    },
  });

  const assets = data || [];

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

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Asset Inventory</h2>
        <button
          onClick={() => navigate("/assets/add")}
          className="btn btn-primary"
        >
          Add New Asset
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search assets..."
          className="input input-bordered w-full max-w-xs focus-within:outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full max-w-xs focus-within:outline-0"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={asset.productImage} alt={asset.productName} />
                    </div>
                  </div>
                </td>

                <td className="font-bold">{asset.productName}</td>

                <td>
                  <div
                    className={`badge ${
                      asset.productType === "Returnable"
                        ? "badge-warning"
                        : "badge-ghost"
                    }`}
                  >
                    {asset.productType}
                  </div>
                </td>

                <td>
                  {asset.availableQuantity} / {asset.productQuantity}
                </td>

                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>

                <td>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {assets.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
