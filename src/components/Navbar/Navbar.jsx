import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router";
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

  const activeClass = "text-primary font-bold border-b-2 border-primary pb-1";
  const normalClass = "hover:text-primary transition font-medium";

  const publicLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Home
      </NavLink>
      {!user && (
        <>
          <NavLink
            to="/register/employee"
            className="btn btn-outline btn-secondary"
          >
            Join as Employee
          </NavLink>
          <NavLink to="/register/hr" className="btn btn-primary">
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
      </NavLink>

      <NavLink
        to="/assets"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Asset List
      </NavLink>
      <NavLink
        to="/assets/add"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Add Asset
      </NavLink>
      <NavLink
        to="/requests"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        All Requests
      </NavLink>
      <NavLink
        to="/my-employees"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        My Employees
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
      </NavLink>
      <NavLink
        to="/my-team"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        My Team
      </NavLink>
      <NavLink
        to="/request-asset"
        className={({ isActive }) => (isActive ? activeClass : normalClass)}
      >
        Request Asset
      </NavLink>
    </>
  );

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 px-4 py-5 md:px-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-primary flex items-center gap-2"
        >
          <img src="/logo.png" alt="" className="size-12" />
          <h1 className="-ms-3">AssetVerse</h1>
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
            <NavLink to="/login" className="btn btn-primary  px-6">
              Login
            </NavLink>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.name}
              >
                <div className="w-10 rounded-full border border-primary">
                  <img
                    src={
                      user.profileImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        user.name
                      )}`
                    }
                    alt={user.name}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li className="menu-title text-center opacity-100">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-bold text-lg">{user.name}</span>
                    <span className="badge badge-accent badge-sm uppercase">
                      {user.role}
                    </span>
                  </div>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <NavLink to="/profile">Profile Settings</NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error font-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="lg:hidden text-3xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden mt-4 bg-base-100 rounded-lg shadow-lg p-4 border border-base-200">
          <div className="flex flex-col gap-4">
            {publicLinks}
            {!user ? (
              <NavLink
                to="/login"
                className="btn btn-primary w-full"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            ) : (
              <>
                <div className="divider my-0">MENU</div>
                {user.role === "hr" && (
                  <>
                    <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
                      Dashboard
                    </NavLink>

                    <NavLink to="/assets" onClick={() => setMenuOpen(false)}>
                      Asset List
                    </NavLink>
                    <NavLink
                      to="/assets/add"
                      onClick={() => setMenuOpen(false)}
                    >
                      Add Asset
                    </NavLink>
                    <NavLink to="/requests" onClick={() => setMenuOpen(false)}>
                      All Requests
                    </NavLink>
                    <NavLink
                      to="/my-employees"
                      onClick={() => setMenuOpen(false)}
                    >
                      Employee List
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
                <div className="divider my-0">MY ACCOUNT</div>
                <div className="flex items-center gap-2 px-2">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src={
                          user.profileImage ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.name
                          )}`
                        }
                        alt={user.name}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{user.name}</span>
                    <span className="text-xs badge badge-ghost">
                      {user.role}
                    </span>
                  </div>
                </div>
                <NavLink
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-sm btn-ghost justify-start content-center"
                >
                  Profile Settings
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="btn btn-error btn-sm w-full mt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
