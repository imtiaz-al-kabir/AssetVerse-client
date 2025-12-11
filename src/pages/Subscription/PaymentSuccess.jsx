import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
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
                            title: "Payment Successful",
                            text: "Your package has been upgraded!",
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
        <div className="min-h-screen flex justify-center items-center">
            <div className="flex flex-col items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <h2 className="mt-4 text-xl font-semibold">Verifying Payment...</h2>
            </div>
        </div>
    );
};

export default PaymentSuccess;
