import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check auth status on mount and when LocalStorage might change
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, [navigate]); // Reacting to navigate often catches login/logout

  const handleLogout = async () => {
    await fetch("/api/users/logout", { method: "POST" });
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50  md:px-10  ">
      <div className="container mx-auto flex justify-between py-4 ">
        <div className="">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl text-primary font-bold"
          >
            AssetVerse
          </Link>
        </div>
        <div className="flex  gap-5">
          {!user ? (
            <>
              <Link to="/" className="btn btn-ghost">
                Home
              </Link>
              <Link to="/register/employee" className="btn btn-ghost">
                Join as Employee
              </Link>
              <Link to="/register/hr" className="btn btn-primary">
                Join as HR Manager
              </Link>
              <Link to="/login" className="btn btn-outline btn-primary ml-2">
                Login
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-primary border-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user.profileImage ||
                      "https://ui-avatars.com/api/?name=" +
                        user.name.replace(" ", "+")
                    }
                    alt={user.name}
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <span className="font-bold text-center">{user.name}</span>
                </li>
                <li>
                  <small className="text-center lowercase text-gray-500">
                    {user.role}
                  </small>
                </li>
                <div className="divider my-0"></div>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                {user.role === "hr" && (
                  <>
                    <li>
                      <Link to="/assets">My Assets</Link>
                    </li>
                    <li>
                      <Link to="/my-employees">My Team</Link>
                    </li>
                    <li>
                      <Link to="/requests">Requests</Link>
                    </li>
                  </>
                )}
                {user.role === "employee" && (
                  <>
                    <li>
                      <Link to="/my-assets">My Assets</Link>
                    </li>
                    <li>
                      <Link to="/my-team">My Team</Link>
                    </li>
                    <li>
                      <Link to="/request-asset">Request Asset</Link>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
