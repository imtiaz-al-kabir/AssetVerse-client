import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-9xl font-bold font-mono">404</h1>
          <p className="py-6 text-2xl">Page Not Found</p>
          <p className="mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link to="/" className="btn btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
