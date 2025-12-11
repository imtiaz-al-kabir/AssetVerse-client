import { motion } from "motion/react";
import { FaBoxOpen, FaClipboardList, FaUsers, FaChartLine, FaMobileAlt, FaShieldAlt } from "react-icons/fa";

const Features = () => {
    const features = [
        {
            title: "Asset Tracking",
            desc: "Real-time tracking of all company assets across departments with instant updates.",
            icon: <FaBoxOpen className="text-5xl" />,
            gradient: "from-blue-500 to-cyan-500",
            bgGradient: "from-blue-500/10 to-cyan-500/10"
        },
        {
            title: "Employee Management",
            desc: "Manage employee profiles and asset history efficiently with automated workflows.",
            icon: <FaUsers className="text-5xl" />,
            gradient: "from-purple-500 to-pink-500",
            bgGradient: "from-purple-500/10 to-pink-500/10"
        },
        {
            title: "Request Workflow",
            desc: "Streamlined request and approval system for new assets with one-click actions.",
            icon: <FaClipboardList className="text-5xl" />,
            gradient: "from-orange-500 to-red-500",
            bgGradient: "from-orange-500/10 to-red-500/10"
        },
        {
            title: "Analytics Dashboard",
            desc: "Insightful reports on asset usage and inventory status with beautiful charts.",
            icon: <FaChartLine className="text-5xl" />,
            gradient: "from-green-500 to-emerald-500",
            bgGradient: "from-green-500/10 to-emerald-500/10"
        },
        {
            title: "Responsive Design",
            desc: "Access your dashboard from desktop, tablet, or mobile with seamless experience.",
            icon: <FaMobileAlt className="text-5xl" />,
            gradient: "from-teal-500 to-blue-500",
            bgGradient: "from-teal-500/10 to-blue-500/10"
        },
        {
            title: "Secure Data",
            desc: "Enterprise-grade security for your sensitive data with end-to-end encryption.",
            icon: <FaShieldAlt className="text-5xl" />,
            gradient: "from-yellow-500 to-orange-500",
            bgGradient: "from-yellow-500/10 to-orange-500/10"
        },
    ];

    return (
        <div className="py-24 bg-base-100 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                        <span className="text-sm font-semibold text-primary">FEATURES</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                        Why Choose{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            AssetVerse?
                        </span>
                    </h2>
                    <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
                        Everything you need to manage your corporate assets efficiently in one powerful platform.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative"
                        >
                            {/* Gradient border effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}></div>

                            <div className="relative bg-base-100 rounded-2xl p-8 shadow-lg border border-base-300 hover:border-transparent transition-all duration-300 h-full">
                                {/* Icon container with gradient background */}
                                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <div className="text-white">
                                        {feature.icon}
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-base-content/70 leading-relaxed">
                                    {feature.desc}
                                </p>

                                {/* Decorative corner */}
                                <div className={`absolute top-4 right-4 w-2 h-2 bg-gradient-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-base-content/60 mb-4">Ready to transform your asset management?</p>
                    <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all">
                        Get Started Free
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Features;
