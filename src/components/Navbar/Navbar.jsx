import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
