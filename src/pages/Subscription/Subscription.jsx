import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const Subscription = () => {
    const [loading, setLoading] = useState(false);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const packages = [
        { name: "Basic", limit: 5, price: 5 },
        { name: "Standard", limit: 10, price: 8 },
        { name: "Premium", limit: 20, price: 15 },
    ];

    const handleSubscribe = async (pkg) => {
        setLoading(true);
        try {
            const res = await axiosSecure.post("/payments/create-checkout-session", {
                packageName: pkg.name,
                price: pkg.price,
                limit: pkg.limit,
                hrEmail: user.email,
                hrName: user.name
            });

            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (err) {
            console.error(err);
            alert("Failed to initiate payment. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h2 className="text-3xl font-bold text-center mb-10">Upgrade Your Plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {packages.map((pkg) => (
                    <div key={pkg.name} className="card bg-base-100 shadow-xl border hover:border-primary transition">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title text-2xl">{pkg.name}</h2>
                            <div className="text-4xl font-bold my-4">${pkg.price}</div>
                            <p className="mb-4">Up to {pkg.limit} Employees</p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSubscribe(pkg)}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : `Select ${pkg.name}`}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Subscription;
