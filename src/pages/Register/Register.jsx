import { Link } from "react-router";

const Register = () => {
  return (
    <div className="hero min-h-[70vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-8">Join AssetVerse</h1>
          <div className="flex flex-col gap-4">
            <Link
              to="/register/hr"
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="card-body text-left">
                <h2 className="card-title text-primary">I am an HR Manager</h2>
                <p>
                  Register your company, manage assets, and build your team.
                </p>
              </div>
            </Link>

            <Link
              to="/register/employee"
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="card-body text-left">
                <h2 className="card-title text-secondary">I am an Employee</h2>
                <p>Join a team, request assets, and view your inventory.</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
