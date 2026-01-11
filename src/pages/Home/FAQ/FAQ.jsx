import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FaChevronDown } from "react-icons/fa";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How does AssetVerse track my assets?",
            answer: "We use a combination of unique asset IDs and real-time database tracking to ensure every item's location and status is always up to date.",
        },
        {
            question: "Can I customize asset categories?",
            answer: "Absolutely! You can create custom categories to match your specific inventory needs, from electronics to furniture.",
        },
        {
            question: "Is there a limit to the number of employees?",
            answer: "Our basic plan supports up to 5 employees. For larger teams, you can upgrade to our premium packages for unlimited access.",
        },
        {
            question: "How do returns work?",
            answer: "Employees can request a return through their dashboard. Once approved by HR, the asset status is automatically updated.",
        },
    ];

    return (
        <div className="py-20 bg-base-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-base-content/70">Got questions? We've got answers.</p>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-base-100 rounded-2xl shadow-md border border-base-300 overflow-hidden"
                        >
                            <button
                                className="w-full p-6 text-left flex justify-between items-center focus:outline-none"
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            >
                                <span className="font-semibold text-lg">{faq.question}</span>
                                <motion.span
                                    animate={{ rotate: activeIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <FaChevronDown className="text-primary" />
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-base-content/70">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
