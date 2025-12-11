import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { checkUser } = useAuth();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        if (sessionId) {
            axiosSecure
                .post("/payments/payment-success", { sessionId })
                .then((res) => {
                    if (res.data.status === "success" || res.data.status === "already_processed") {
                        Swal.fire({
                            icon: "success",
                            title: "Payment Successful!",
                            text: "Your package has been upgraded successfully",
                            showConfirmButton: false,
                            timer: 2000,
                        });
                        checkUser();
                        navigate("/dashboard");
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Payment Failed",
                            text: "Could not verify payment.",
                        });
                        navigate("/subscription");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Something went wrong during payment verification.",
                    });
                    navigate("/subscription");
                });
        } else {
            navigate("/");
        }
    }, [sessionId, axiosSecure, navigate]);

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-success/10 via-base-100 to-primary/10 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-72 h-72 bg-success/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center text-center"
            >
                {/* Animated Icon */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="w-24 h-24 bg-gradient-to-br from-success to-primary rounded-full flex items-center justify-center shadow-2xl mb-6"
                >
                    <FaSpinner className="text-5xl text-white" />
                </motion.div>

                {/* Text */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-bold mb-4"
                >
                    Verifying Payment...
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-base-content/70 text-lg"
                >
                    Please wait while we confirm your transaction
                </motion.p>

                {/* Loading dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-2 mt-6"
                >
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                            className="w-3 h-3 bg-primary rounded-full"
                        />
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
};

export default PaymentSuccess;
