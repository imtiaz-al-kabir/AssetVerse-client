import About from "../About/About";
import Hero from "../Hero/Hero";
import Packages from "../Packages/Packages";
import Testimonials from "../Testimonials/Testimonials";
import Features from "../Features/Features";
import Stats from "../Stats/Stats";
import Partners from "../Partners/Partners";
import FAQ from "../FAQ/FAQ";
import Newsletter from "../Newsletter/Newsletter";
import BlogPreview from "../BlogPreview/BlogPreview";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div className="bg-base-200 -mt-0">
      <Helmet>
        <title>AssetVerse | Modern Asset Management</title>
      </Helmet>

      {/* Hero Section */}
      <Hero />

      {/* Partners Marquee */}
      <Partners />

      {/* Stats Section */}
      <Stats />

      {/* About Section */}
      <About />

      {/* Features Section */}
      <Features />

      {/* Packages Section */}
      <Packages />

      {/* Testimonials */}
      <Testimonials />

      {/* Blog Preview */}
      <BlogPreview />

      {/* FAQ Section */}
      <FAQ />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;
