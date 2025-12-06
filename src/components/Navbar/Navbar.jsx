import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router";
import useAxiosBase from "../../hooks/useAxiosBase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const axiosBase = useAxiosBase();

  // Fetch logged-in user from cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosBase.get("/users/me", { withCredentials: true });
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [axiosBase]);

  // Logout function
  const handleLogout = async () => {
    try {
      await axiosBase.post("/users/logout", {}, { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {}
  };

  const activeClass = "text-primary font-bold border-b-2 border-primary pb-1";
  const normalClass = "hover:text-primary transition";

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 px-4 py-4 md:px-10">
      <div className="container mx-auto flex justify-between items-center">

        {/* LEFT - LOGO */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          AssetVerse
        </NavLink>

        {/* CENTER (Desktop Navigation) */}
        <div className="hidden md:flex gap-8 items-center flex-1 justify-center">
          {!user ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/register/employee"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Join as Employee
              </NavLink>

              <NavLink
                to="/register/hr"
                className={({ isActive }) =>
                  isActive ? activeClass : normalClass
                }
              >
                Join as HR Manager
              </NavLink>
            </>
          ) : (
            <>
              {user.role === "hr" && (
                <>
                  <NavLink to="/assets" className={normalClass}>
                    Assets
                  </NavLink>
                  <NavLink to="/my-employees" className={normalClass}>
                    My Team
                  </NavLink>
                  <NavLink to="/requests" className={normalClass}>
                    Requests
                  </NavLink>
                </>
              )}

              {user.role === "employee" && (
                <>
                  <NavLink to="/my-assets" className={normalClass}>
                    My Assets
                  </NavLink>
                  <NavLink to="/my-team" className={normalClass}>
                    My Team
                  </NavLink>
                  <NavLink to="/request-asset" className={normalClass}>
                    Request Asset
                  </NavLink>
                </>
              )}

              <NavLink to="/dashboard" className={normalClass}>
                Dashboard
              </NavLink>
            </>
          )}
        </div>

        {/* RIGHT - PROFILE */}
        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <NavLink to="/login" className="btn btn-primary">
                Login
              </NavLink>
            </>
          ) : (
            <>
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={
                    user.profileImage ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}`
                  }
                  alt="avatar"
                />
              </div>

              <div className="text-right">
                <p className="font-bold">{user.name}</p>
                <small className="text-gray-500">{user.role}</small>
              </div>

              <button onClick={handleLogout} className="btn btn-sm btn-error">
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-base-100 rounded-lg shadow-inner p-4">
          {!user ? (
            <div className="space-y-4">
              <NavLink to="/" onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>

              <NavLink
                to="/register/employee"
                onClick={() => setMenuOpen(false)}
              >
                Join as Employee
              </NavLink>

              <NavLink to="/register/hr" onClick={() => setMenuOpen(false)}>
                Join as HR Manager
              </NavLink>

              <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </NavLink>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-12 h-12 rounded-full border-2 border-primary"
                  src={
                    user.profileImage ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}`
                  }
                  alt=""
                />
                <div>
                  <p className="font-bold">{user.name}</p>
                  <small className="text-gray-500">{user.role}</small>
                </div>
              </div>

              <div className="divider"></div>

              <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </NavLink>

              {user.role === "hr" && (
                <>
                  <NavLink to="/assets" onClick={() => setMenuOpen(false)}>
                    Assets
                  </NavLink>
                  <NavLink to="/my-employees" onClick={() => setMenuOpen(false)}>
                    My Team
                  </NavLink>
                  <NavLink to="/requests" onClick={() => setMenuOpen(false)}>
                    Requests
                  </NavLink>
                </>
              )}

              {user.role === "employee" && (
                <>
                  <NavLink to="/my-assets" onClick={() => setMenuOpen(false)}>
                    My Assets
                  </NavLink>
                  <NavLink to="/my-team" onClick={() => setMenuOpen(false)}>
                    My Team
                  </NavLink>
                  <NavLink
                    to="/request-asset"
                    onClick={() => setMenuOpen(false)}
                  >
                    Request Asset
                  </NavLink>
                </>
              )}

              <button className="btn btn-error w-full" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
