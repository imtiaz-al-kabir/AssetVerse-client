import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { FaRocket, FaCheckCircle } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left z-10"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
              <FaRocket className="text-primary" />
              <span className="text-sm font-semibold text-primary">Modern Asset Management</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Master Your Assets with{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AssetVerse
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-base-content/70 mb-8 max-w-2xl">
              Streamline your company's inventory, employee assignments, and
              return tracking in one unified platform. Say goodbye to
              spreadsheets and hello to efficiency.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 text-left">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-success text-xl" />
                <span className="text-sm font-medium">Real-time Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-success text-xl" />
                <span className="text-sm font-medium">Automated Workflows</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-success text-xl" />
                <span className="text-sm font-medium">Instant Reports</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/register/hr")}
                className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start as HR Manager
                <FaRocket className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate("/register/employee")}
                className="btn btn-outline btn-secondary btn-lg hover:shadow-lg transition-all duration-300"
              >
                Join as Employee
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-base-300">
              <div>
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-base-content/60">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">5K+</div>
                <div className="text-sm text-base-content/60">Assets Tracked</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">99%</div>
                <div className="text-sm text-base-content/60">Satisfaction</div>
              </div>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative z-10"
          >
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-2xl"></div>

              <img
                src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                className="relative rounded-2xl shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500"
                alt="Office Asset Management"
              />

              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-base-100 rounded-xl shadow-xl p-4 border border-base-300"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-success text-2xl" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">Asset Verified</div>
                    <div className="text-sm text-base-content/60">Laptop #A1234</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
