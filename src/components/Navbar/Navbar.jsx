import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router";
import useAxiosBase from "../../hooks/useAxiosBase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const axiosBase = useAxiosBase();

  // Fetch logged-in user from backend via cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosBase.get("/users/me", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
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
    } catch (err) {
      console.error(err);
    }
  };

  const activeClass = "text-primary font-bold border-b-2 border-primary pb-1";
  const normalClass = "hover:text-primary transition";

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 px-4 py-4 md:px-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-primary">
          AssetVerse
        </NavLink>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {!user ? (
            <>
              <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass)}>Home</NavLink>
              <NavLink to="/register/employee" className={({ isActive }) => (isActive ? activeClass : normalClass)}>Join as Employee</NavLink>
              <NavLink to="/register/hr" className="btn btn-primary">Join as HR Manager</NavLink>
              <NavLink to="/login" className="btn btn-outline btn-primary ml-2">Login</NavLink>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
                <img
                  src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`}
                  alt="avatar"
                />
              </div>
              <div className="flex flex-col text-right">
                <span className="font-bold">{user.name}</span>
                <small className="text-gray-500">{user.role}</small>
              </div>
              <NavLink to="/dashboard" className={normalClass}>Dashboard</NavLink>
              <button className="btn btn-sm btn-error" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden mt-3 bg-base-100 rounded-lg shadow-inner p-4">
          {!user ? (
            <div className="space-y-4">
              <NavLink to="/" className={({ isActive }) => (isActive ? activeClass : normalClass)} onClick={() => setMenuOpen(false)}>Home</NavLink>
              <NavLink to="/register/employee" className="block" onClick={() => setMenuOpen(false)}>Join as Employee</NavLink>
              <NavLink to="/register/hr" className="btn btn-primary w-full" onClick={() => setMenuOpen(false)}>Join as HR Manager</NavLink>
              <NavLink to="/login" className="btn btn-outline btn-primary w-full" onClick={() => setMenuOpen(false)}>Login</NavLink>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                  <img src={user.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}`} alt="avatar" />
                </div>
                <div>
                  <p className="font-bold">{user.name}</p>
                  <small className="text-gray-500">{user.role}</small>
                </div>
              </div>

              <div className="divider"></div>

              <NavLink to="/dashboard" className={normalClass} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>

              {user.role === "hr" && (
                <>
                  <NavLink to="/assets" onClick={() => setMenuOpen(false)}>My Assets</NavLink>
                  <NavLink to="/my-employees" onClick={() => setMenuOpen(false)}>My Team</NavLink>
                  <NavLink to="/requests" onClick={() => setMenuOpen(false)}>Requests</NavLink>
                </>
              )}

              {user.role === "employee" && (
                <>
                  <NavLink to="/my-assets" onClick={() => setMenuOpen(false)}>My Assets</NavLink>
                  <NavLink to="/my-team" onClick={() => setMenuOpen(false)}>My Team</NavLink>
                  <NavLink to="/request-asset" onClick={() => setMenuOpen(false)}>Request Asset</NavLink>
                </>
              )}

              <button className="btn btn-error w-full" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
