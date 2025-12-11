import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestAsset = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  const axiosSecure = useAxiosSecure();

  const fetchAssets = async () => {
    try {
      let query = "/assets?";
      if (search) query += `search=${search}&`;

      const res = await axiosSecure.get(query);
      setAssets(res.data.assets || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [search, axiosSecure]);

  const openRequestModal = (asset) => {
    setSelectedAsset(asset);
    setModalOpen(true);
  };

  const handleRequest = async () => {
    try {
      const res = await axiosSecure.post("/requests", {
        assetId: selectedAsset._id,
        requestType: "Request",
        note,
      });

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Request Sent",
          text: "Your request has been sent to HR.",
          timer: 2000,
        });
        setModalOpen(false);
        setNote("");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: err.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Request an Asset</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search your assets..."
          className="input input-bordered w-full focus-within:outline-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <loading />
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
