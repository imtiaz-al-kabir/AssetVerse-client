import { Helmet } from "react-helmet-async";

const Terms = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-base-100">
            <Helmet>
                <title>Terms & Conditions | AssetVerse</title>
            </Helmet>
            <div className="container mx-auto max-w-4xl prose">
                <h1>Terms and Conditions</h1>
                <p>Last updated: January 2025</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using AssetVerse, you agree to be bound by these Terms.</p>

                <h2>2. Use of Service</h2>
                <p>You agree to use the service only for lawful purposes and in accordance with these Terms.</p>

                <h2>3. Accounts</h2>
                <p>You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.</p>

                <h2>4. Termination</h2>
                <p>We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.</p>
            </div>
        </div>
    );
};

export default Terms;
