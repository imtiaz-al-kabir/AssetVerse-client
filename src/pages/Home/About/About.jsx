import { motion } from "motion/react";
const About = () => {
  return (
    <div className="py-20 px-4 container mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-10"
      >
        Why Choose AssetVerse?
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {["Real-time Tracking", "Automated Affiliation", "Instant Reports"].map(
          (feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body items-center text-center">
                <h3 className="card-title">{feature}</h3>
                <p>
                  Keep track of every laptop, monitor, and chair in your
                  organization seamlessly.
                </p>
              </div>
            </motion.div>
          )
        )}
      </div>
    </div>
  );
};

export default About;
