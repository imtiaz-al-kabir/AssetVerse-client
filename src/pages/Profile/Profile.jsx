import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaUser, FaEnvelope, FaBuilding, FaSave } from "react-icons/fa";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [companyLogo, setCompanyLogo] = useState("");

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
        title: 'Profile Updated!',
        text: 'Your changes have been saved successfully',
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

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Card */}
          <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-primary to-secondary p-8 text-white relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-white ring-offset-4 ring-offset-transparent shadow-2xl">
                    <img
                      src={
                        profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&size=128&background=6366f1&color=fff`
                      }
                      alt={user.name}
                    />
                  </div>
                </div>

                {/* User Info */}
                <div className="text-center md:text-left">
                  <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
                  <p className="text-white/80 text-lg mb-3">{user.email}</p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="badge badge-lg bg-white/20 border-white/40 text-white">
                      {user.role === "hr" ? "HR Manager" : "Employee"}
                    </span>
                    {user.companyName && (
                      <span className="badge badge-lg bg-white/20 border-white/40 text-white">
                        {user.companyName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form Card */}
          <div className="bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaUser className="text-primary" />
                Edit Profile
              </h2>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/* Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaUser className="text-primary" />
                      Full Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Your name"
                  />
                </div>

                {/* Email (Read Only) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold flex items-center gap-2">
                      <FaEnvelope className="text-primary" />
                      Email Address
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user.email}
                    disabled
                    className="input input-bordered bg-base-200 cursor-not-allowed"
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">Email cannot be changed</span>
                  </label>
                </div>

                {/* Profile Image */}
                <div>
                  <ImageUpload
                    label="Profile Image"
                    defaultUrl={profileImage}
                    onUpload={(url) => setProfileImage(url)}
                  />
                </div>

                {/* Company Logo (HR Only) */}
                {user.role === "hr" && (
                  <div>
                    <ImageUpload
                      label="Company Logo"
                      defaultUrl={companyLogo}
                      onUpload={(url) => setCompanyLogo(url)}
                    />
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full shadow-lg hover:shadow-xl hover:scale-105 transition-all text-lg"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
