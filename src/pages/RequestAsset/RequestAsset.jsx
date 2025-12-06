import { useEffect, useState } from "react";

const RequestAsset = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  const fetchAssets = async () => {
    try {
      // Employee sees all assets from all companies for discovery
      let query = "/api/assets?";
      if (search) query += `search=${search}&`;

      const res = await fetch(query);
      const data = await res.json();
      setAssets(data.assets || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [search]);

  const openRequestModal = (asset) => {
    setSelectedAsset(asset);
    setModalOpen(true);
  };

  const handleRequest = async () => {
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetId: selectedAsset._id,
          requestType: "Request", // Default
          note: note,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Request sent successfully!");
        setModalOpen(false);
        setNote("");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Request an Asset</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for laptops, chairs, etc..."
          className="input input-bordered w-full focus-within:outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <span className="loading loading-spinner text-center"></span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
            >
              <figure className="px-10 pt-10">
                <img
                  src={asset.productImage || "https://via.placeholder.com/150"}
                  alt={asset.productName}
                  className="rounded-xl h-48 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{asset.productName}</h2>
                <p className="text-sm">{asset.companyName}</p>
                <div className="badge badge-outline">{asset.productType}</div>
                <p className="text-xs mt-2">
                  Available: {asset.availableQuantity}
                </p>
                <div className="card-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    disabled={asset.availableQuantity <= 0}
                    onClick={() => openRequestModal(asset)}
                  >
                    {asset.availableQuantity > 0 ? "Request" : "Out of Stock"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Request {selectedAsset?.productName}
            </h3>
            <p className="py-4">
              Please add a note for the HR manager (e.g., why you need this
              item).
            </p>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Reason for request..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <div className="modal-action">
              <button
                className="btn btn-ghost"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleRequest}>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
