import { FaGoogle, FaAmazon, FaMicrosoft, FaApple, FaSpotify, FaSlack } from "react-icons/fa";
import Marquee from "react-fast-marquee";

const Partners = () => {
    const brands = [
        { icon: <FaGoogle />, name: "Google" },
        { icon: <FaAmazon />, name: "Amazon" },
        { icon: <FaMicrosoft />, name: "Microsoft" },
        { icon: <FaApple />, name: "Apple" },
        { icon: <FaSpotify />, name: "Spotify" },
        { icon: <FaSlack />, name: "Slack" },
        { icon: <FaGoogle />, name: "Google" },
        { icon: <FaAmazon />, name: "Amazon" },
    ];

    return (
        <div className="py-12 bg-base-100 border-y border-base-200">
            <div className="container mx-auto px-4 text-center mb-8">
                <p className="text-sm font-bold tracking-widest text-base-content/50 uppercase">Trusted by industry leaders</p>
            </div>

            <Marquee gradient={true} gradientColor="transparent" speed={40}>
                {brands.map((brand, index) => (
                    <div key={index} className="mx-12 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                        <div className="text-5xl">{brand.icon}</div>
                    </div>
                ))}
            </Marquee>
        </div>
    );
};

export default Partners;
