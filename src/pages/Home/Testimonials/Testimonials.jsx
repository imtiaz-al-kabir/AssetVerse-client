import { motion } from "motion/react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "AssetVerse changed how we manage our remote team's equipment. It's a lifesaver! The automation features alone saved us 20 hours per week.",
      author: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=6366f1&color=fff"
    },
    {
      quote: "The best asset management solution we've tried. Intuitive interface and powerful features that actually work as advertised.",
      author: "Michael Chen",
      role: "Operations Manager",
      company: "StartupXYZ",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=ec4899&color=fff"
    },
    {
      quote: "Incredible platform! Our asset tracking accuracy went from 60% to 99% within the first month. Highly recommended!",
      author: "Emily Rodriguez",
      role: "IT Manager",
      company: "Global Solutions Inc",
      rating: 5,
      avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=f59e0b&color=fff"
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-base-200 to-base-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
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
            <span className="text-sm font-semibold text-primary">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Trusted by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              100+ Companies
            </span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            See what our customers have to say about their experience with AssetVerse
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="relative bg-base-100 rounded-2xl p-8 shadow-xl border border-base-300 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                {/* Quote icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg">
                  <FaQuoteLeft className="text-white text-xl" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4 mt-2">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <FaStar key={idx} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base-content/80 italic mb-6 flex-grow leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author info */}
                <div className="flex items-center gap-4 pt-4 border-t border-base-300">
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={testimonial.avatar} alt={testimonial.author} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-base-content">{testimonial.author}</div>
                    <div className="text-sm text-base-content/60">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: "100+", label: "Happy Companies" },
            { value: "5K+", label: "Assets Managed" },
            { value: "99%", label: "Customer Satisfaction" },
            { value: "24/7", label: "Support Available" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-base-content/60">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;