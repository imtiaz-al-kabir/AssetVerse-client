import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Theme Management
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const activeClass = "text-primary font-bold relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-secondary";
  const normalClass = "hover:text-primary transition-all duration-300 font-medium relative group";

  const publicLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Home
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
      {!user && (
        <>
          <NavLink
            to="/register/employee"
            className="btn btn-outline btn-secondary hover:scale-105 transition-transform"
          >
            Join as Employee
          </NavLink>
          <NavLink
            to="/register/hr"
            className="btn btn-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            Join as HR Manager
          </NavLink>
        </>
      )}
    </>
  );

  // Role-based Links for Navbar
  const hrLinks = (
    <>
      <NavLink
        to="/dashboard"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Dashboard
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>

      <NavLink
        to="/assets"
        end
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Asset List
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
      <NavLink
        to="/assets/add"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Add Asset
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
      <NavLink
        to="/requests"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        All Requests
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
      <NavLink
        to="/my-employees"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        My Employees
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
    </>
  );

  const employeeLinks = (
    <>
      <NavLink
        to="/my-assets"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        My Assets
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
      <NavLink
        to="/my-team"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        My Team
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
      <NavLink
        to="/request-asset"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Request Asset
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
      </NavLink>
    </>
  );

  return (
    <nav className="bg-base-100/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 px-4 py-4 md:px-10 border-b border-base-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-bold flex items-center gap-2 group"
        >
          <motion.img
            src="/logo.png"
            alt="AssetVerse Logo"
            className="size-12 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          />
          <h1 className="-ms-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AssetVerse
          </h1>
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="hidden lg:flex gap-6 items-center">
          {publicLinks}
          {user && user.role === "hr" && hrLinks}
          {user && user.role === "employee" && employeeLinks}
        </div>

        {/* AUTH STATE / DROPDOWN */}
        <div className="hidden lg:flex items-center gap-3">
          {!user ? (
            <NavLink to="/login" className="btn btn-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all px-6">
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar ring-2 ring-primary ring-offset-2 ring-offset-base-100 hover:ring-4 transition-all"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                      )}&background=6366f1&color=fff`
                    }
                    alt={user.name}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-50 p-3 shadow-2xl menu menu-sm dropdown-content bg-base-100 rounded-2xl w-64 border border-base-300"
              >
                <li className="menu-title">
                  <div className="flex flex-col items-center gap-2 py-3">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-2">
                        <img
                          src={
                            user.profileImage ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=6366f1&color=fff`
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <span className="font-bold text-lg">{user.name}</span>
                    <span className="badge badge-primary badge-sm uppercase">
                      {user.role}
                    </span>
                  </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <NavLink to="/profile" className="flex items-center gap-2 hover:bg-primary/10">
                    <FaCog className="text-primary" />
                    Profile Settings
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-bold flex items-center gap-2 hover:bg-error/10"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* THEME CONTROLLER */}
        <label className="swap swap-rotate mr-4 text-base-content hover:text-primary transition-colors">
          <input
            type="checkbox"
            onChange={handleThemeChange}
            checked={theme === "dark"}
          />
          {/* sun icon */}
          <svg className="swap-off fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,4.93l.71.71A1,1,0,0,0,5.64,7.05Zm12,1.41a1,1,0,0,0,.7-1.71l-.71-.71a1,1,0,0,0-1.41,0l-.71.71A1,1,0,0,0,17.66,8.46ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          {/* moon icon */}
          <svg className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
        </label>

        {/* MOBILE TOGGLE */}
        <button
          className="lg:hidden text-3xl text-base-content hover:text-primary transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 bg-base-100 rounded-2xl shadow-2xl p-6 border border-base-300 overflow-hidden"
          >
            <div className="flex flex-col gap-4">
              {publicLinks}
              {!user ? (
                <NavLink
                  to="/login"
                  className="btn btn-primary w-full shadow-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </NavLink>
              ) : (
                <>
                  <div className="divider my-0">MENU</div>
                  {user.role === "hr" && (
                    <>
                      <NavLink to="/dashboard" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        Dashboard
                      </NavLink>
                      <NavLink to="/assets" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        Asset List
                      </NavLink>
                      <NavLink to="/assets/add" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        Add Asset
                      </NavLink>
                      <NavLink to="/requests" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        All Requests
                      </NavLink>
                      <NavLink to="/my-employees" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        Employee List
                      </NavLink>
                    </>
                  )}
                  {user.role === "employee" && (
                    <>
                      <NavLink to="/my-assets" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        My Assets
                      </NavLink>
                      <NavLink to="/my-team" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        My Team
                      </NavLink>
                      <NavLink to="/request-asset" onClick={() => setMenuOpen(false)} className="hover:text-primary transition">
                        Request Asset
                      </NavLink>
                    </>
                  )}
                  <div className="divider my-0">MY ACCOUNT</div>
                  <div className="flex items-center gap-3 px-2 py-2 bg-base-200 rounded-lg">
                    <div className="avatar">
                      <div className="w-12 rounded-full ring ring-primary ring-offset-2">
                        <img
                          src={
                            user.profileImage ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              user.name
                            )}&background=6366f1&color=fff`
                          }
                          alt={user.name}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">{user.name}</span>
                      <span className="text-xs badge badge-primary badge-sm uppercase">
                        {user.role}
                      </span>
                    </div>
                  </div>
                  <NavLink
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-ghost justify-start gap-2"
                  >
                    <FaCog />
                    Profile Settings
                  </NavLink>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="btn btn-error w-full gap-2"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
