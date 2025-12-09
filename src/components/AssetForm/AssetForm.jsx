import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosBase from "../../hooks/useAxiosBase";

const AssetForm = () => {
  const navigate = useNavigate();
  const axiosBase = useAxiosBase();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleAsset = async (data) => {
    const formData = {
      productName: data.productName,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      productImage: data.productImage,
    };

    try {
      const res = await axiosBase.post("/assets", formData, {
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
    <div className="flex justify-center items-center py-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center mb-4">Add New Asset</h2>
          <form onSubmit={handleSubmit(handleAsset)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                {...register("productName", { required: true })}
                className="input input-bordered w-full focus-within:outline-0"
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Product Image URL</span>
              </label>
              <input
                type="text"
                {...register("productImage", { required: true })}
                className="input input-bordered w-full focus-within:outline-0"
                placeholder="https://..."
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Product Type</span>
              </label>
              <select
                {...register("productType")}
                className="select select-bordered w-full focus-within:outline-0"
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
                {...register("productQuantity", { required: true })}
                className="input input-bordered w-full focus-within:outline-0"
                min="1"
              />
            </div>

            <div className="card-actions justify-center mt-6">
              <button
                type="submit"
                className="btn btn-primary w-full focus-within:outline-0"
              >
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
