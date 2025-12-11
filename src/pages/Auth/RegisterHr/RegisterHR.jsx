import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaUser, FaEnvelope, FaLock, FaBuilding, FaCalendar, FaUserTie } from "react-icons/fa";
import ImageUpload from "../../../components/ImageUpload/ImageUpload";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RegisterHR = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleHR = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      companyName: data.companyName,
      companyLogo: data.companyLogo,
      role: "hr",
    };

    try {
      await registerUser(formData);
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to AssetVerse!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 relative overflow-hidden py-12 px-4">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaUserTie className="text-4xl" />
            </motion.div>
            <h2 className="text-3xl font-bold">Join as HR Manager</h2>
            <p className="text-white/80 mt-2">Manage your company's assets efficiently</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(handleHR)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaUser className="text-primary" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-error text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Company Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaBuilding className="text-primary" />
                      Company Name
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("companyName", { required: "Company name is required" })}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Acme Corp"
                  />
                  {errors.companyName && (
                    <p className="text-error text-sm mt-1">{errors.companyName.message}</p>
                  )}
                </div>
              </div>

              {/* Company Logo */}
              <div>
                <input
                  type="hidden"
                  {...register("companyLogo", { required: "Company Logo is required" })}
                />
                <ImageUpload
                  label="Company Logo"
                  onUpload={(url) => setValue("companyLogo", url, { shouldValidate: true })}
                />
                {errors.companyLogo && (
                  <p className="text-error text-sm mt-1">{errors.companyLogo.message}</p>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaEnvelope className="text-primary" />
                      Email
                    </span>
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email"
                      }
                    })}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="john@company.com"
                  />
                  {errors.email && (
                    <p className="text-error text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaCalendar className="text-primary" />
                      Date of Birth
                    </span>
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth")}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaLock className="text-primary" />
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters required",
                    },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/,
                      message: "Must include uppercase, lowercase & special character",
                    },
                  })}
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
              >
                Register Company
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-base-content/70">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-semibold hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterHR;
