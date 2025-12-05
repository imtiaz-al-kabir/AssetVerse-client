import React from 'react';
import { useNavigate } from "react-router";
import { motion } from "motion/react";
const Hero = () => {
    const navigate = useNavigate();
    return (
       <div className="hero min-h-[80vh] bg-base-100">
        <div className="hero-content flex-col lg:flex-row-reverse text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              className="max-w-sm lg:max-w-full rounded-lg shadow-2xl"
              alt="Office Asset Management"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 lg:pr-10"
          >
            <h1 className="text-5xl font-bold text-primary">
              Master Your Assets with{" "}
              <span className="text-secondary">AssetVerse</span>
            </h1>
            <p className="py-6 text-lg">
              Streamline your company's inventory, employee assignments, and
              return tracking in one unified platform. Say goodbye to
              spreadsheets.
            </p>
            <div className="flex gap-4 justify-center lg:justify-start">
              <button
                onClick={() => navigate("/register/hr")}
                className="btn btn-primary"
              >
                Start as HR Manager
              </button>
              <button
                onClick={() => navigate("/register/employee")}
                className="btn btn-outline btn-secondary"
              >
                Join as Employee
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
};

export default Hero;