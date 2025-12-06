import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [companyLogo, setCompanyLogo] = useState(""); // Only for HR
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setUser(parsed);
      setName(parsed.name);
      setProfileImage(parsed.profileImage || "");
      if (parsed.role === "hr") {
        setCompanyLogo(parsed.companyLogo || "");
      }
    }
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const body = { name, profileImage };
      if (user.role === "hr") body.companyLogo = companyLogo;

      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const updated = await res.json();
        // Merge needed token? No, token is cookie. Just update user info.
        // We should preserve token if stored? Wait, current impl doesn't store token in localStorage, only userInfo.
        // Actually authController returns a new object. Use that.

        // If the backend response doesn't include the 'token' but we need it?
        // The cookie is HttpOnly, so frontend doesn't manage it.
        // We just update the userInfo object.

        localStorage.setItem("userInfo", JSON.stringify(updated));
        setUser(updated);
        setSuccessMsg("Profile updated successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Loading...</div>;

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
                className="input input-bordered w-full"
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
                className="input input-bordered w-full"
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
                  className="input input-bordered w-full"
                  placeholder="https://..."
                />
              </div>
            )}

            <div className="card-actions justify-center mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Update Profile
              </button>
            </div>

            {successMsg && (
              <div className="alert alert-success mt-4 p-2 text-sm">
                {successMsg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
