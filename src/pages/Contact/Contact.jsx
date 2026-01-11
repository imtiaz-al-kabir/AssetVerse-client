import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'We will get back to you shortly.',
            timer: 2000,
            showConfirmButton: false
        });
        e.target.reset();
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-base-200">
            <Helmet>
                <title>Contact Us | AssetVerse</title>
            </Helmet>

            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">Get in Touch</h1>
                    <p className="text-base-content/70">We'd love to hear from you. Here's how you can reach us.</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                                <FaMapMarkerAlt />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Visit Us</h3>
                                <p className="text-base-content/70">123 Asset St, Tech City, TC 90210</p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-4">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary text-xl">
                                <FaPhone />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Call Us</h3>
                                <p className="text-base-content/70">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl p-6 flex flex-row items-center gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center text-accent text-xl">
                                <FaEnvelope />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">Email Us</h3>
                                <p className="text-base-content/70">support@assetverse.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="card bg-base-100 shadow-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Your Name" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="your@email.com" className="input input-bordered w-full" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea className="textarea textarea-bordered h-32" placeholder="How can we help?" required></textarea>
                            </div>
                            <button className="btn btn-primary w-full">Send Message</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
