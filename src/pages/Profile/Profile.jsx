import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [companyLogo, setCompanyLogo] = useState(""); // Only for HR

  useEffect(() => {
    if (user) {
      setName(user.name);
      setProfileImage(user.profileImage || "");
      if (user.role === "hr") {
        setCompanyLogo(user.companyLogo || "");
      }
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = { name, profileImage };
      if (user.role === "hr") body.companyLogo = companyLogo;

      await updateUser(body);

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.response?.data?.message || 'Something went wrong'
      });
    }
  };

  if (!user) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-4">
            My Profile
          </h2>

          <div className="flex justify-center mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    profileImage || "https://ui-avatars.com/api/?name=" + name
                  }
                  alt="Profile"
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input input-bordered w-full focus-within:outline-0"
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Email (Read Only)</span>
              </label>
              <input
                type="text"
                value={user.email}
                disabled
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full mt-2">
              <label className="label">
                <span className="label-text">Profile Image URL</span>
              </label>
              <input
                type="text"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                className="input input-bordered w-full focus-within:outline-0"
                placeholder="https://..."
              />
            </div>

            {user.role === "hr" && (
              <div className="form-control w-full mt-2">
                <label className="label">
                  <span className="label-text">Company Logo URL</span>
                </label>
                <input
                  type="text"
                  value={companyLogo}
                  onChange={(e) => setCompanyLogo(e.target.value)}
                  className="input input-bordered w-full focus-within:outline-0"
                  placeholder="https://..."
                />
              </div>
            )}

            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
