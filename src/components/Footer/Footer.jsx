import { FaFacebook, FaTwitter, FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-base-200 to-base-300 text-base-content overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="AssetVerse" className="w-10 h-10" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AssetVerse
              </h3>
            </div>
            <p className="text-base-content/70 mb-6 leading-relaxed">
              Corporate Asset Management System providing reliable tracking and management solutions since 2024.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: FaFacebook, href: "#", color: "hover:text-blue-500" },
                { icon: FaTwitter, href: "#", color: "hover:text-sky-500" },
                { icon: FaLinkedin, href: "#", color: "hover:text-blue-600" },
                { icon: FaGithub, href: "#", color: "hover:text-gray-700" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-base-100 flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg`}
                  >
                    <Icon className="text-lg" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              Services
            </h4>
            <ul className="space-y-3">
              {["Asset Tracking", "Employee Management", "Reporting & Analytics", "24/7 Support"].map((service, i) => (
                <li key={i}>
                  <a href="#" className="text-base-content/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              Company
            </h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", to: "/" },
                { label: "Contact", to: "/" },
                { label: "Careers", to: "/" },
                { label: "Blog", to: "/" }
              ].map((link, i) => (
                <li key={i}>
                  <NavLink
                    to={link.to}
                    className="text-base-content/70 hover:text-primary transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base-content/70">
                <FaMapMarkerAlt className="text-primary mt-1 flex-shrink-0" />
                <span>123 Business Ave, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-base-content/70">
                <FaPhone className="text-primary flex-shrink-0" />
                <a href="tel:+1234567890" className="hover:text-primary transition">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center gap-3 text-base-content/70">
                <FaEnvelope className="text-primary flex-shrink-0" />
                <a href="mailto:support@assetverse.com" className="hover:text-primary transition">
                  support@assetverse.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-base-content/10">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-bold mb-3">Stay Updated</h4>
            <p className="text-base-content/70 mb-6">
              Subscribe to our newsletter for the latest updates and features
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="btn btn-primary shadow-lg hover:shadow-xl hover:scale-105 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-base-content/10 bg-base-300/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-base-content/60 text-sm">
              © {new Date().getFullYear()} AssetVerse. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-base-content/60 hover:text-primary transition">
                Terms of Service
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition">
                Privacy Policy
              </a>
              <a href="#" className="text-base-content/60 hover:text-primary transition">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
