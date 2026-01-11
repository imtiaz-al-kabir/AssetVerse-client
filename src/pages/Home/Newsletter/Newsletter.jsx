import { useState } from "react";
import Swal from "sweetalert2";

const Newsletter = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email) return;

        Swal.fire({
            icon: 'success',
            title: 'Subscribed!',
            text: 'Thank you for joining our newsletter.',
            timer: 2000,
            showConfirmButton: false
        });
        setEmail("");
    };

    return (
        <div className="py-20 bg-primary text-primary-content relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-8 max-w-2xl mx-auto opacity-90">
                    Get the latest updates on asset management trends, new features, and exclusive offers delivered straight to your inbox.
                </p>

                <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="input input-lg w-full text-base-content"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn btn-lg btn-secondary">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Newsletter;
