import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const RequestForm = () => {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    assetId: "",
    requestType: "Request",
    reason: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch("/api/assets");
        const data = await res.json();
        if (res.ok) {
          setAssets(data.filter((a) => a.status === "Available"));
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAssets();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/dashboard");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Make a Request</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Request Type</span>
              </label>
              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="Request">Request Asset</option>
                <option value="Return">Return Asset</option>
                <option value="Repair">Report Repair</option>
              </select>
            </div>

            {formData.requestType === "Request" ? (
              <div className="form-control w-full mt-2">
                <label className="label">
                  <span className="label-text">Select Asset</span>
                </label>
                <select
                  name="assetId"
                  value={formData.assetId}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
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
                value={formData.reason}
                onChange={handleChange}
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
