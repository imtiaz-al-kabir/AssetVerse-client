import { useState } from "react";
import { useNavigate } from "react-router";

const AssetForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productType: "Returnable",
    productQuantity: 1,
    productImage: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        navigate("/dashboard"); // Or back to asset list
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Add New Asset</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Product Image URL</span>
              </label>
              <input
                type="text"
                name="productImage"
                value={formData.productImage}
                onChange={handleChange}
                className="input input-bordered w-full"
                placeholder="https://..."
                required
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Product Type</span>
              </label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Product Quantity</span>
              </label>
              <input
                type="number"
                name="productQuantity"
                value={formData.productQuantity}
                onChange={handleChange}
                className="input input-bordered w-full"
                min="1"
                required
              />
            </div>

            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Add Asset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetForm;
