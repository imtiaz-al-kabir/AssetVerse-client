import CountUp from "react-countup";
import { FaBuilding, FaUsers, FaBoxOpen, FaSmile } from "react-icons/fa";

const Stats = () => {
    const stats = [
        { icon: <FaBuilding />, count: 150, label: "Companies" },
        { icon: <FaUsers />, count: 8500, label: "Employees" },
        { icon: <FaBoxOpen />, count: 12000, label: "Assets Tracked" },
        { icon: <FaSmile />, count: 98, label: "Satisfaction Rate", suffix: "%" },
    ];

    return (
        <div className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-6 bg-base-100 rounded-2xl shadow-xl border border-base-200 hover:-translate-y-2 transition-transform duration-300">
                            <div className="text-4xl text-primary mb-4">{stat.icon}</div>
                            <div className="text-4xl font-bold mb-2">
                                <CountUp end={stat.count} duration={2.5} suffix={stat.suffix || "+"} />
                            </div>
                            <div className="text-base-content/70 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
