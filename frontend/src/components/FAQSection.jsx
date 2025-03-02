import { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  { question: "What is MarketMinds?", answer: "MarketMinds is a trading journal platform that helps traders track and analyze their trades with AI insights." },
  { question: "How can I sign up?", answer: "You can sign up by clicking on the 'Get Started' button on the homepage and following the registration steps." },
  { question: "Is MarketMinds free to use?", answer: "We offer a free plan with basic features and premium plans for advanced analytics and AI-powered insights." },
  { question: "Can I access my data on multiple devices?", answer: "Yes, your data is securely stored in the cloud, allowing you to access it from anywhere." },
  { question: "How do I contact support?", answer: "You can reach us via the live chat, contact form, or email at support@marketminds.com." },
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
