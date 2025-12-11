import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaSearch, FaBox, FaCheckCircle, FaTimes } from "react-icons/fa";
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
    setNote("");
    setModalOpen(true);
  };

  const handleRequest = async () => {
    if (!note.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Note Required",
        text: "Please provide a reason for your request.",
      });
      return;
    }

    try {
      const res = await axiosSecure.post("/requests", {
        assetId: selectedAsset._id,
        requestType: "Request",
        reason: note,
      });

      if (res.status === 201 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Request Sent!",
          text: "Your request has been sent to HR.",
          showConfirmButton: false,
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-accent/5 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Request an Asset
            </h2>
            <p className="text-base-content/70">Browse and request available assets from your company</p>
          </div>

          {/* Search */}
          <div className="bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6 mb-8">
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
                className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Asset Grid */}
          {assets.length === 0 ? (
            <div className="text-center py-20">
              <FaBox className="text-6xl text-base-content/20 mx-auto mb-4" />
              <p className="text-lg text-base-content/60">No assets available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {assets.map((asset, index) => (
                <motion.div
                  key={asset._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <div className="bg-base-100 rounded-2xl shadow-lg border border-base-300 hover:border-primary/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <figure className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      <img
                        src={asset.productImage || "https://via.placeholder.com/300"}
                        alt={asset.productName}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {asset.availableQuantity <= 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="badge badge-error badge-lg">Out of Stock</span>
                        </div>
                      )}
                    </figure>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{asset.productName}</h3>
                      <p className="text-sm text-base-content/60 mb-3">{asset.companyName}</p>

                      <div className="flex items-center justify-between mb-4">
                        <span className="badge badge-outline">{asset.productType}</span>
                        <span className="text-sm font-semibold">
                          <span className="text-primary">{asset.availableQuantity}</span> available
                        </span>
                      </div>

                      {/* Action Button */}
                      <button
                        className={`btn btn-primary w-full mt-auto shadow-lg hover:shadow-xl hover:scale-105 transition-all ${asset.availableQuantity <= 0 ? "btn-disabled" : ""
                          }`}
                        disabled={asset.availableQuantity <= 0}
                        onClick={() => openRequestModal(asset)}
                      >
                        {asset.availableQuantity > 0 ? "Request Asset" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal modal-open"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="modal-box max-w-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"
              >
                <FaTimes />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10 flex-shrink-0">
                  <img
                    src={selectedAsset?.productImage || "https://via.placeholder.com/80"}
                    alt={selectedAsset?.productName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-2xl mb-1">Request Asset</h3>
                  <p className="text-lg font-semibold text-primary">{selectedAsset?.productName}</p>
                  <p className="text-sm text-base-content/60">{selectedAsset?.companyName}</p>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Reason for Request</span>
                    <span className="label-text-alt text-error">* Required</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-32 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                    placeholder="Please explain why you need this asset..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  ></textarea>
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      {note.length}/500 characters
                    </span>
                  </label>
                </div>

                {/* Asset Details */}
                <div className="bg-base-200 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Asset Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-base-content/60">Type:</span>
                      <span className="ml-2 badge badge-sm badge-outline">{selectedAsset?.productType}</span>
                    </div>
                    <div>
                      <span className="text-base-content/60">Available:</span>
                      <span className="ml-2 font-semibold text-primary">{selectedAsset?.availableQuantity}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="modal-action">
                <button
                  className="btn btn-outline"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary gap-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  onClick={handleRequest}
                >
                  <FaCheckCircle />
                  Submit Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RequestAsset;
