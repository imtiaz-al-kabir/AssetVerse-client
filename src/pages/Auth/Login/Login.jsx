import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: "Logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 relative overflow-hidden py-12 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <FaSignInAlt className="text-4xl" />
            </motion.div>
            <h2 className="text-3xl font-bold">Welcome Back</h2>
            <p className="text-white/80 mt-2">Sign in to continue to AssetVerse</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <FaEnvelope className="text-primary" />
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
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm mt-1 flex items-center gap-1"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              {/* Password Field */}
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
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="••••••••"
                />
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-error text-sm mt-1"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover text-primary">
                    Forgot password?
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
              >
                <FaSignInAlt className="mr-2" />
                Sign In
              </button>
            </form>


            {/* Divider */}
            <div className="divider my-6">OR</div>

            {/* Register Links */}
            <div className="space-y-3">
              <p className="text-center text-sm text-base-content/70">
                Don't have an account?
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/register/employee"
                  className="btn btn-outline btn-secondary btn-sm hover:scale-105 transition-transform"
                >
                  Join as Employee
                </Link>
                <Link
                  to="/register/hr"
                  className="btn btn-outline btn-primary btn-sm hover:scale-105 transition-transform"
                >
                  Join as HR
                </Link>
              </div>
            </div>
          </div>
        </div >

        {/* Bottom decoration */}
        < div className="text-center mt-6 text-base-content/60 text-sm" >
          <p>Protected by enterprise-grade security</p>
        </div >
      </motion.div >
    </div >
  );
};

export default Login;
