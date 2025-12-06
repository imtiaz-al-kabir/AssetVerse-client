import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const navigate = useNavigate();

  const fetchAssets = async () => {
    try {
      let query = "/api/assets?";
      if (search) query += `search=${search}&`;
      if (filterType) query += `type=${filterType}&`;

      const res = await fetch(query);
      const data = await res.json();
      setAssets(data.assets || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [search, filterType]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      try {
        const res = await fetch(`/api/assets/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchAssets();
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
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
          className="input input-bordered w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-full max-w-xs"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

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
