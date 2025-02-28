import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How does MarketMinds help traders?",
    answer: "MarketMinds provides a trading journal, AI-driven insights, and analytics to help traders refine their strategies and improve consistency.",
  },
  {
    question: "Is MarketMinds suitable for beginners?",
    answer: "Absolutely! Our platform is designed to be user-friendly, offering educational insights along with trade logging and performance tracking.",
  },
  {
    question: "Can I use MarketMinds for free?",
    answer: "Yes! We offer a free plan with essential features. For advanced analytics and AI-driven insights, we have premium plans.",
  },
  {
    question: "How secure is my trading data?",
    answer: "Your data is encrypted and stored securely. We prioritize user privacy and ensure top-level security protocols are followed.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-8">
        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]">Questions</span>
      </h2>
      <div className="w-full max-w-3xl">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-4 rounded-lg overflow-hidden shadow-md"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 bg-gray-100 text-left text-gray-900 font-semibold hover:bg-gray-200"
            >
              {faq.question}
              {openIndex === index ? <FaMinus className="text-[#4ECCA3]" /> : <FaPlus className="text-[#00c3ff]" />}
            </button>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: openIndex === index ? "auto" : 0, opacity: openIndex === index ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 bg-white text-gray-700 overflow-hidden"
            >
              <p className="py-4">{faq.answer}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
