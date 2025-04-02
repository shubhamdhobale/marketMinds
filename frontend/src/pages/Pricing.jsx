import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import logo from '../assets/images/logo.png'

const pricingPlans = {
  monthly: [
    { name: "Free", price: "10", features: ["Basic Trade Logging", "Limited Insights", "Community Access"] },
    { name: "Pro", price: "19", features: ["Advanced Trade Analytics", "AI-Powered Insights", "Export Reports"] },
    { name: "Premium", price: "49", features: ["Personalized Coaching", "Priority Support", "Full Data Access"] },
  ],
  yearly: [
    { name: "Free", price: "10", features: ["Basic Trade Logging", "Limited Insights", "Community Access"] },
    { name: "Pro", price: "190", features: ["Advanced Trade Analytics", "AI-Powered Insights", "Export Reports"], savings: "Save $38!"},
    { name: "Premium", price: "490", features: ["Personalized Coaching", "Priority Support", "Full Data Access"], savings: "Save $98!"},
  ],
};

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const checkoutHandler = async (price) => {
    try {
      const {data:{key}} = await axios.get("http://localhost:5000/api/payment/getkey");
      const amount = Number(price);
      const { data:{order} } = await axios.post("http://localhost:5000/api/payment/checkout", {
        amount,
      });

      const options = {
        key, 
        amount: order.amount, 
        currency: "INR",
        name: "MarketMinds",
        description: "Test Transaction",
        image: {logo},
        order_id: order.id, 
        callback_url: "http://localhost:5000/api/payment/paymentverification",
        prefill: {
            name: "Gaurav Kumar",
            email: "gaurav.kumar@example.com",
            contact: "9000090000"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#4ECCA3"
        }
      };
      const razor = new window.Razorpay(options);
      razor.open();
      // console.log(data);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 pt-30 px-6 bg-gray-100">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-6 tracking-wider">
        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] tracking-wider">Plan</span>
      </h2>
      
      {/* Toggle Switch */}
      <div className="flex items-center space-x-4 mb-8">
        <span className={`text-lg font-medium ${!isYearly ? "text-gray-900" : "text-gray-500"}`}>Monthly</span>
        <div
          className="relative w-14 h-8 bg-gray-300 rounded-full cursor-pointer flex items-center"
          onClick={() => setIsYearly(!isYearly)}
        >
          <motion.div
            className="absolute w-6 h-6 bg-[#4ECCA3] rounded-full"
            layout
            initial={{ left: "4px" }}
            animate={{ left: isYearly ? "calc(100% - 28px)" : "4px" }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
        <span className={`text-lg font-medium ${isYearly ? "text-gray-900" : "text-gray-500"}`}>Yearly</span>
      </div>
      
      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl px-6 md:px-2">
        {pricingPlans[isYearly ? "yearly" : "monthly"].map((plan, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-2xl p-6 text-center hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-4xl font-extrabold my-3 text-[#4ECCA3]">{plan.price}</p>
            {plan.savings && (
              <p className="text-sm text-red-500 font-semibold">{plan.savings}</p>
            )}
            <ul className="mt-4 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="text-gray-700">✅ {feature}</li>
              ))}
            </ul>
            <button className="mt-6 bg-[#00c3ff] text-white px-5 py-3 rounded-md shadow-md hover:bg-[#009ac7] transition-all duration-300" onClick={() => checkoutHandler(plan.price)}>
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
