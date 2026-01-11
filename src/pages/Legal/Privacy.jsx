import { Helmet } from "react-helmet-async";

const Privacy = () => {
    return (
        <div className="min-h-screen pt-24 pb-12 px-4 bg-base-100">
            <Helmet>
                <title>Privacy Policy | AssetVerse</title>
            </Helmet>
            <div className="container mx-auto max-w-4xl prose">
                <h1>Privacy Policy</h1>
                <p>Last updated: January 2025</p>

                <h2>1. Information We Collect</h2>
                <p>We collect information you provide directly to us when you create an account, request assets, or communicate with us.</p>

                <h2>2. How We Use Your Information</h2>
                <p>We use your information to provide, maintain, and improve our services, including asset tracking and inventory management.</p>

                <h2>3. Sharing of Information</h2>
                <p>We do not share your personal information with third parties except as described in this policy.</p>

                <h2>4. Security</h2>
                <p>We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access.</p>
            </div>
        </div>
    );
};

export default Privacy;
