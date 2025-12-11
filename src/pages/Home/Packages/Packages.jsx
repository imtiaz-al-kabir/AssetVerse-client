import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxiosBase from "../../../hooks/useAxiosBase";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaCrown, FaStar, FaRocket } from "react-icons/fa";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const axiosBase = useAxiosBase();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosBase.get("/packages");
        if (res.data && res.data.length > 0) {
          setPackages(res.data);
        } else {
          // Fallback data if DB is empty
          setPackages([
            { name: "Basic", price: 5, employeeLimit: 5, features: ["Up to 5 Employees", "Basic Support", "Asset Tracking", "Email Notifications"] },
            { name: "Standard", price: 8, employeeLimit: 10, features: ["Up to 10 Employees", "Priority Support", "Basic Analytics", "Custom Reports", "API Access"] },
            { name: "Premium", price: 15, employeeLimit: 20, features: ["Up to 20 Employees", "24/7 Support", "Advanced Analytics", "Custom Integrations", "Dedicated Manager", "White Label"] },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch packages", error);
        // Fallback on error too
        setPackages([
          { name: "Basic", price: 5, employeeLimit: 5, features: ["Up to 5 Employees", "Basic Support", "Asset Tracking", "Email Notifications"] },
          { name: "Standard", price: 8, employeeLimit: 10, features: ["Up to 10 Employees", "Priority Support", "Basic Analytics", "Custom Reports", "API Access"] },
          { name: "Premium", price: 15, employeeLimit: 20, features: ["Up to 20 Employees", "24/7 Support", "Advanced Analytics", "Custom Integrations", "Dedicated Manager", "White Label"] },
        ]);
      }
    };
    fetchPackages();
  }, [axiosBase]);

  const handlePackageClick = async (pkg) => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosSecure.post("/payments/create-checkout-session", {
        packageName: pkg.name,
        price: pkg.price,
        limit: pkg.employeeLimit,
        hrEmail: user.email,
        hrName: user.name
      });

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      alert("Failed to start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPackageIcon = (index) => {
    const icons = [FaStar, FaCrown, FaRocket];
    return icons[index % icons.length];
  };

  const getGradient = (index) => {
    const gradients = [
      { from: "from-blue-500", to: "to-cyan-500", bg: "from-blue-500/10 to-cyan-500/10" },
      { from: "from-purple-500", to: "to-pink-500", bg: "from-purple-500/10 to-pink-500/10" },
      { from: "from-orange-500", to: "to-red-500", bg: "from-orange-500/10 to-red-500/10" }
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="py-24 bg-gradient-to-b from-base-100 to-base-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">PRICING</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Simple,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Choose the perfect plan for your team. All plans include core features with no hidden fees.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, i) => {
            const Icon = getPackageIcon(i);
            const gradient = getGradient(i);
            const isPopular = i === 1;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`relative group ${isPopular ? 'md:-mt-4' : ''}`}
              >
                {/* Popular badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-full shadow-lg">
                      <span className="text-white font-bold text-sm">MOST POPULAR</span>
                    </div>
                  </div>
                )}

                {/* Gradient glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-3xl opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>

                {/* Card */}
                <div className={`relative bg-base-100 rounded-3xl p-8 shadow-xl border-2 ${isPopular ? 'border-primary' : 'border-base-300'} hover:border-primary transition-all duration-300 h-full flex flex-col`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradient.bg} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className={`text-3xl bg-gradient-to-br ${gradient.from} ${gradient.to} bg-clip-text text-transparent`} />
                  </div>

                  {/* Package name */}
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                        ${pkg.price}
                      </span>
                      <span className="text-base-content/60">/month</span>
                    </div>
                    <p className="text-sm text-base-content/60 mt-2">
                      Up to {pkg.employeeLimit} Employees
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className={`mt-0.5 w-5 h-5 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <FaCheck className="text-white text-xs" />
                        </div>
                        <span className="text-base-content/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePackageClick(pkg)}
                    disabled={loading}
                    className={`btn btn-block ${isPopular ? 'btn-primary' : 'btn-outline btn-primary'} btn-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      <>Choose {pkg.name}</>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12 text-base-content/60"
        >
          <p>All plans include 14-day free trial • No credit card required • Cancel anytime</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Packages;
