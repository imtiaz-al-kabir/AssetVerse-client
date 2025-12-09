import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
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
    <div className="flex justify-center items-center py-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">
            Join as Employee
          </h2>
          <form onSubmit={handleSubmit(handleEmployee)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />

              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Password</span>
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
                    message:
                      "Password must include uppercase, lowercase & special character",
                  },
                })}
                className="input input-bordered w-full"
              />

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Date of Birth</span>
              </label>
              <input
                type="date"
                {...register("dateOfBirth")}
                className="input input-bordered w-full"
              />
            </div>

            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-secondary w-full">
                Join AssetVerse
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEmployee;
