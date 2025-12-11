import React, { useEffect, useState } from 'react';
import {
    PaymentElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

export default function CheckoutForm({ selectedPackage }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/subscription`,
            },
            redirect: 'if_required'
        });

        if (error) {
            if (error.type === "card_error" || error.type === "validation_error") {
                setMessage(error.message);
            } else {
                setMessage("An unexpected error occurred.");
            }
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            setMessage("Payment succeeded!");

            // Save payment info to database
            const paymentInfo = {
                hrEmail: user.email,
                packageName: selectedPackage.name,
                employeeLimit: selectedPackage.limit,
                amount: selectedPackage.price,
                transactionId: paymentIntent.id,
                status: 'completed'
            };

            try {
                const res = await axiosSecure.post('/payments', paymentInfo);
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: `You have successfully upgraded to ${selectedPackage.name} package!`,
                        showConfirmButton: false,
                        timer: 2000
                    });
                    navigate('/dashboard');
                }
            } catch (err) {
                console.error('Error saving payment info', err);
                setMessage("Payment succeeded but failed to update record. Please contact support.");
            }
        }

        setIsLoading(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isLoading || !stripe || !elements} id="submit" className="btn btn-primary w-full mt-4">
                <span id="button-text">
                    {isLoading ? "Processing..." : `Pay $${selectedPackage.price}`}
                </span>
            </button>
            {/* Show any error or success messages */}
            {message && <div id="payment-message" className="alert alert-info mt-4 text-sm">{message}</div>}
        </form>
    );
}
