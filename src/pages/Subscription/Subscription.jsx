// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import { useEffect, useState } from "react";
// import CheckoutForm from "../components/CheckoutForm";

// // Make sure to call loadStripe outside of a component’s render to avoid
// // recreating the Stripe object on every render.
// // This is your test publishable API key.
// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

// export default function Subscription() {
//   const [clientSecret, setClientSecret] = useState("");

//   useEffect(() => {
//     // Create PaymentIntent as soon as the page loads
//     const createIntent = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       if (!userInfo) return;

//       try {
//         const res = await fetch("/api/payments/create-intent", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ currency: "usd" }), // Amount is default 2000 in backend
//         });
//         const data = await res.json();
//         setClientSecret(data.clientSecret);
//       } catch (error) {
//         console.error("Error creating intent:", error);
//       }
//     };
//     createIntent();
//   }, []);

//   const appearance = {
//     theme: "stripe",
//   };
//   const options = {
//     clientSecret,
//     appearance,
//   };

//   return (
//     <div className="flex justify-center items-center h-[80vh]">
//       <div className="card w-96 bg-base-100 shadow-xl p-6">
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Subscribe to AssetVerse
//         </h2>
//         <p className="mb-4 text-center">Unlock premium features for $20.00</p>
//         {clientSecret && (
//           <Elements options={options} stripe={stripePromise}>
//             <CheckoutForm />
//           </Elements>
//         )}
//         {!clientSecret && (
//           <span className="loading loading-dots loading-lg mx-auto"></span>
//         )}
//       </div>
//     </div>
//   );
// }
