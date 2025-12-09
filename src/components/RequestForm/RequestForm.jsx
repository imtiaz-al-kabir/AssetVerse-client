import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
        withCredentials: true, // important to send/receive cookies
      });
      console.log(res);
      if (res.status === 201) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "New Asset  has been Created",
          showConfirmButton: false,
          timer: 1500,
        });
        // Cookie is automatically stored, no need for localStorage
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || " failed");
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Make a Request</h2>
          <form onSubmit={handleSubmit(handleRequest)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Request Type</span>
              </label>
              <select
                name="requestType"
                {...register("requestType")}
                className="select select-bordered w-full"
              >
                <option value="Request">Request Asset</option>
                <option value="Return">Return Asset</option>
                <option value="Repair">Report Repair</option>
              </select>
            </div>

            {requestType === "Request" ? (
              <div className="form-control w-full mt-2">
                <label className="label">
                  <span className="label-text">Select Asset</span>
                </label>
                <select
                  name="assetId"
                  {...register("assetId", { required: true })}
                  className="select select-bordered w-full"
                >
                  <option value="">-- Select Available Asset --</option>
                  {assets.map((asset) => (
                    <option key={asset._id} value={asset._id}>
                      {asset.name} ({asset.type})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="form-control w-full mt-2">
                <label className="label">
                  <span className="label-text">Asset Serial/ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Asset ID for now"
                  className="input input-bordered w-full"
                  disabled
                />
                <label className="label">
                  <span className="label-text-alt text-warning">
                    Return/Repair logic requires assigned assets lookup
                  </span>
                </label>
              </div>
            )}

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Reason / Comments</span>
              </label>
              <textarea
                name="reason"
                {...register("reason")}
                className="textarea textarea-bordered h-24"
                placeholder="Why do you need this?"
              ></textarea>
            </div>

            <div className="card-actions justify-end mt-6">
              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
