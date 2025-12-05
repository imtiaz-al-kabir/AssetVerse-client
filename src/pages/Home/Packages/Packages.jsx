import { motion } from "motion/react";
const Packages = () => {
  const packages = [
    {
      name: "Basic",
      employeeLimit: 5,
      price: 5,
      features: ["Asset Tracking", "Employee Management", "Basic Support"],
      color: "border-primary",
    },
    {
      name: "Standard",
      employeeLimit: 10,
      price: 8,
      features: [
        "All Basic features",
        "Advanced Analytics",
        "Priority Support",
      ],
      color: "border-secondary",
    },
    {
      name: "Premium",
      employeeLimit: 20,
      price: 15,
      features: ["All Standard features", "Custom Branding", "24/7 Support"],
      color: "border-accent",
    },
  ];
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
              className={`card w-full max-w-sm bg-base-100 shadow-xl border-t-4 ${pkg.color}`}
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
