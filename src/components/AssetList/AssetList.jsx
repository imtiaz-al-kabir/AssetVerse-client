import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosBase from "../../hooks/useAxiosBase";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const axiosBase = useAxiosBase();
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadAssets = async () => {
      try {
        let query = "assets?";
        if (search) query += `search=${search}&`;
        if (filterType) query += `type=${filterType}&`;

        const res = await axiosBase.get(query);

        if (active) {
          setAssets(res.data.assets || []);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadAssets();

    return () => {
      active = false; // cleanup to avoid cascading renders
    };
  }, [search, filterType]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This asset will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosBase.delete(`/assets/${id}`);

          if (res.data.success) {
            Swal.fire("Deleted!", "Asset has been removed.", "success");
          }
        } catch (err) {
          Swal.fire("Error!", "Failed to delete asset.", "error");
        }
      }
    });
  };

  return (
    <div className="container mx-auto p-4">
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
