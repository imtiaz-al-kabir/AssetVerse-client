import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaUser, FaEnvelope, FaLock, FaCalendar, FaUserPlus } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const RegisterEmployee = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleEmployee = async (data) => {
    const formData = {
      name: data.name,
      email: data.email,
      password: data.password,
      dateOfBirth: data.dateOfBirth,
      role: "employee",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/10 via-base-100 to-accent/10 relative overflow-hidden py-12 px-4">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-secondary to-accent p-8 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaUserPlus className="text-4xl" />
            </motion.div>
            <h2 className="text-3xl font-bold">Join as Employee</h2>
            <p className="text-white/80 mt-2">Start managing your assets today</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(handleEmployee)} className="space-y-6">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaUser className="text-secondary" />
                    Full Name
                  </span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="text-error text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaEnvelope className="text-secondary" />
                    Email Address
                  </span>
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-error text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaLock className="text-secondary" />
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
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-error text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaCalendar className="text-secondary" />
                    Date of Birth
                  </span>
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  className="input input-bordered focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-secondary w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
              >
                Join AssetVerse
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-sm text-base-content/70">
              Already have an account?{" "}
              <a href="/login" className="text-secondary font-semibold hover:underline">
                Login here
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterEmployee;
