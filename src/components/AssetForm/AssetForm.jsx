import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaBox, FaImage, FaLayerGroup, FaHashtag } from "react-icons/fa";
import Swal from "sweetalert2";
import ImageUpload from "../ImageUpload/ImageUpload";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssetForm = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
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
      const res = await axiosSecure.post("/assets", formData);
      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Asset Created!",
          text: "New asset has been added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Asset",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FaBox className="text-3xl" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Add New Asset</h2>
                <p className="text-white/80 mt-1">Register a new asset to your inventory</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(handleAsset)} className="space-y-6">
              {/* Product Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaBox className="text-primary" />
                    Product Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("productName", { required: "Product name is required" })}
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="e.g., Dell Laptop XPS 15"
                />
                {errors.productName && (
                  <p className="text-error text-sm mt-1">{errors.productName.message}</p>
                )}
              </div>

              {/* Product Image */}
              <div>
                <input
                  type="hidden"
                  {...register("productImage", {
                    required: "Product Image is required",
                  })}
                />
                <ImageUpload
                  label="Product Image"
                  onUpload={(url) =>
                    setValue("productImage", url, { shouldValidate: true })
                  }
                />
                {errors.productImage && (
                  <p className="text-error text-sm mt-1">{errors.productImage.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Product Type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaLayerGroup className="text-primary" />
                      Product Type
                    </span>
                  </label>
                  <select
                    {...register("productType")}
                    className="select select-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  >
                    <option value="Returnable">Returnable</option>
                    <option value="Non-returnable">Non-returnable</option>
                  </select>
                </div>

                {/* Product Quantity */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaHashtag className="text-primary" />
                      Quantity
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("productQuantity", {
                      required: "Quantity is required",
                      min: { value: 1, message: "Minimum quantity is 1" }
                    })}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    min="1"
                    placeholder="10"
                  />
                  {errors.productQuantity && (
                    <p className="text-error text-sm mt-1">{errors.productQuantity.message}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
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
                  className="btn btn-primary flex-1 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AssetForm;
