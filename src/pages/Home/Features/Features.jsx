import { FaBoxOpen, FaClipboardList, FaUsers, FaChartLine, FaMobileAlt, FaShieldAlt } from "react-icons/fa";

const Features = () => {
    const features = [
        {
            title: "Asset Tracking",
            desc: "Real-time tracking of all company assets across departments.",
            icon: <FaBoxOpen className="text-4xl text-primary" />,
        },
        {
            title: "Employee Management",
            desc: "Manage employee profiles and asset history efficiently.",
            icon: <FaUsers className="text-4xl text-secondary" />,
        },
        {
            title: "Request Workflow",
            desc: "Streamlined request and approval system for new assets.",
            icon: <FaClipboardList className="text-4xl text-accent" />,
        },
        {
            title: "Analytics",
            desc: "Insightful reports on asset usage and inventory status.",
            icon: <FaChartLine className="text-4xl text-info" />,
        },
        {
            title: "Responsive Design",
            desc: "Access your dashboard from desktop, tablet, or mobile.",
            icon: <FaMobileAlt className="text-4xl text-success" />,
        },
        {
            title: "Secure Data",
            desc: "Enterprise-grade security for your sensitive data.",
            icon: <FaShieldAlt className="text-4xl text-warning" />,
        },
    ];

    return (
        <div className="py-20 bg-base-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Why Choose AssetVerse?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">Everything you need to manage your corporate assets efficiently in one place.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <div key={i} className="card bg-base-100 shadow-xl border hover:shadow-2xl transition-shadow duration-300">
                            <div className="card-body items-center text-center">
                                <div className="mb-4">{feature.icon}</div>
                                <h2 className="card-title mb-2">{feature.title}</h2>
                                <p>{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
