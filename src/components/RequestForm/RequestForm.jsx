import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaClipboardList, FaBox, FaCommentDots } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosBase from "../../hooks/useAxiosBase";

const RequestForm = () => {
  const [assets, setAssets] = useState([]);
  const axiosBase = useAxiosBase();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const requestType = watch("requestType");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axiosBase.get("/assets", {
          withCredentials: true,
        });

        if (res.status === 200) {
          setAssets(res.data.filter((a) => a.status === "Available"));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAssets();
  }, [axiosBase]);

  const handleRequest = async (data) => {
    const formData = {
      assetId: data.assetId,
      requestType: "Request",
      reason: data.reason,
    };

    try {
      const res = await axiosBase.post("/requests", formData, {
        withCredentials: true,
      });
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Request Submitted!",
          text: "Your asset request has been created successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Request Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-accent/5 via-base-100 to-info/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent to-info p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FaClipboardList className="text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Make a Request</h2>
                <p className="text-white/80 mt-1">Request an asset from your company</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(handleRequest)} className="space-y-6">
              {/* Request Type */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaClipboardList className="text-accent" />
                    Request Type
                  </span>
                </label>
                <select
                  {...register("requestType")}
                  className="select select-bordered focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                >
                  <option value="Request">Request Asset</option>
                  <option value="Return">Return Asset</option>
                  <option value="Repair">Report Repair</option>
                </select>
              </div>

              {/* Asset Selection */}
              {requestType === "Request" ? (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaBox className="text-accent" />
                      Select Asset
                    </span>
                  </label>
                  <select
                    {...register("assetId", { required: "Please select an asset" })}
                    className="select select-bordered focus:outline-none focus:ring-2 focus:ring-accent transition-all"
                  >
                    <option value="">-- Select Available Asset --</option>
                    {assets.map((asset) => (
                      <option key={asset._id} value={asset._id}>
                        {asset.name} ({asset.type})
                      </option>
                    ))}
                  </select>
                  {errors.assetId && (
                    <p className="text-error text-sm mt-1">{errors.assetId.message}</p>
                  )}
                  {assets.length === 0 && (
                    <p className="text-warning text-sm mt-2">No available assets at the moment</p>
                  )}
                </div>
              ) : (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Asset Serial/ID</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Asset ID"
                    className="input input-bordered"
                    disabled
                  />
                  <label className="label">
                    <span className="label-text-alt text-warning flex items-center gap-1">
                      ⚠️ Return/Repair logic requires assigned assets lookup
                    </span>
                  </label>
                </div>
              )}

              {/* Reason */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaCommentDots className="text-accent" />
                    Reason / Comments
                  </span>
                </label>
                <textarea
                  {...register("reason", { required: "Please provide a reason" })}
                  className="textarea textarea-bordered h-32 focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
                  placeholder="Why do you need this asset? Please provide details..."
                ></textarea>
                {errors.reason && (
                  <p className="text-error text-sm mt-1">{errors.reason.message}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="btn btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-accent flex-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RequestForm;
