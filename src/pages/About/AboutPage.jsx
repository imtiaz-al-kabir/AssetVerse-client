import About from "../Home/About/About";
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
    return (
        <div className="pt-20">
            <Helmet>
                <title>About Us | AssetVerse</title>
            </Helmet>
            <About />

            {/* Additional "Our Story" or Team section specific to the page */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
                <p className="max-w-3xl mx-auto text-center text-lg text-base-content/80">
                    To empower organizations with seamless, intelligent, and efficient asset management solutions.
                    We believe in transparency, accountability, and the power of digital transformation.
                </p>
            </div>
        </div>
    );
};

export default AboutPage;
