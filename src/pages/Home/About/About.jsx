import { motion } from "motion/react";
import { FaBolt, FaUsers, FaChartBar } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaBolt className="text-4xl" />,
      title: "Real-time Tracking",
      description: "Keep track of every laptop, monitor, and chair in your organization seamlessly with instant updates.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: <FaUsers className="text-4xl" />,
      title: "Automated Affiliation",
      description: "Employees are automatically affiliated with their company upon registration for seamless onboarding.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <FaChartBar className="text-4xl" />,
      title: "Instant Reports",
      description: "Generate comprehensive reports and analytics with beautiful visualizations at the click of a button.",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="py-24 bg-base-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-semibold text-primary">ABOUT US</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AssetVerse?
            </span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            We're revolutionizing asset management with cutting-edge technology and user-centric design.
            Experience the future of workplace efficiency.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <div className="relative bg-base-100 rounded-2xl p-8 shadow-xl border border-base-300 hover:border-transparent transition-all duration-300 h-full">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="relative text-base-content/70 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className={`absolute bottom-4 right-4 w-20 h-1 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20"
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to Transform Your Asset Management?
          </h3>
          <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
            Join hundreds of companies already using AssetVerse to streamline their operations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all">
              Start Free Trial
            </button>
            <button className="btn btn-outline btn-primary btn-lg hover:shadow-lg transition-all">
              Schedule Demo
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
