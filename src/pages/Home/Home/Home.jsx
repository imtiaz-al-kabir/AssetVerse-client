import About from "../About/About";
import Hero from "../Hero/Hero";
import Packages from "../Packages/Packages";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div className="bg-base-200 -mt-4">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Packages Section */}

      <Packages />
      {/* Testimonials */}
     <Testimonials/>
    </div>
  );
};

export default Home;
