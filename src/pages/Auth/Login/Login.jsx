import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
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
        title: "Logged in successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">Login</h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full max-w-xs focus-within:outline-0"
              />

              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="input input-bordered w-full max-w-xs focus-within:outline-0"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-4 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-primary font-semibold cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
