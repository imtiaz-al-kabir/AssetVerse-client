import { motion } from "motion/react";

import { useEffect, useState } from "react";
import useAxiosBase from "../../../hooks/useAxiosBase";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const axiosBase = useAxiosBase();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosBase.get("/packages");
        if (res.data && res.data.length > 0) {
          setPackages(res.data);
        } else {
          // Fallback data if DB is empty
          setPackages([
            { name: "Basic", price: 5, employeeLimit: 5, features: ["Up to 5 Employees", "Basic Support", "Asset Tracking"] },
            { name: "Standard", price: 8, employeeLimit: 10, features: ["Up to 10 Employees", "Priority Support", "Basic Analytics"] },
            { name: "Premium", price: 15, employeeLimit: 20, features: ["Up to 20 Employees", "Full Support", "Advanced Analytics"] },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch packages", error);
        // Fallback on error too
        setPackages([
          { name: "Basic", price: 5, employeeLimit: 5, features: ["Up to 5 Employees", "Basic Support", "Asset Tracking"] },
          { name: "Standard", price: 8, employeeLimit: 10, features: ["Up to 10 Employees", "Priority Support", "Basic Analytics"] },
          { name: "Premium", price: 15, employeeLimit: 20, features: ["Up to 20 Employees", "Full Support", "Advanced Analytics"] },
        ]);
      }
    }
    fetchPackages();
  }, [axiosBase]);

  // Fallback or coloring logic could be added
  const getColor = (index) => {
    const colors = ["border-primary", "border-secondary", "border-accent"];
    return colors[index % colors.length];
  }

  return (
    <div className="py-20 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`card w-full max-w-sm bg-base-100 shadow-xl border-t-4 ${getColor(i)}`}
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title text-2xl">{pkg.name}</h2>
                <h3 className="text-4xl font-bold my-4">
                  ${pkg.price}
                  <span className="text-sm font-normal">/mo</span>
                </h3>
                <p className="font-bold">Up to {pkg.employeeLimit} Employees</p>
                <ul className="my-4 space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <div className="card-actions">
                  <button className="btn btn-primary btn-wide">
                    Choose {pkg.name}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Packages;
