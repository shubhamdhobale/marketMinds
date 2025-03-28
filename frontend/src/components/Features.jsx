import { motion } from 'framer-motion';
import { FaChartLine, FaClipboardList, FaShieldAlt, FaCogs, FaSyncAlt } from 'react-icons/fa';

const features = [
  { icon: <FaChartLine size={40} className="text-[#4ECCA3]" />, title: "Trade Analytics", description: "Gain deep insights into your trading performance and refine your strategies." },
  { icon: <FaClipboardList size={40} className="text-[#00c3ff]" />, title: "Trade Journal", description: "Easily log and review your trades to track your progress over time." },
  { icon: <FaShieldAlt size={40} className="text-[#4ECCA3]" />, title: "Risk Management", description: "Optimize your risk-reward ratios to protect your capital." },
  { icon: <FaCogs size={40} className="text-[#00c3ff]" />, title: "Strategy Tracking", description: "Monitor and refine your trading plans for consistent growth." },
  { icon: <FaSyncAlt size={40} className="text-[#4ECCA3]" />, title: "Multi-Device Sync", description: "Access your data anywhere, anytime with seamless synchronization." }
];

const Features = () => {
  return (
    <div className="py-16 px-6 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-gray-900 tracking-wider"
      >
        Powerful Features to Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] tracking-wider">Trading</span> 
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg text-gray-600 mt-4 tracking-wider"
      >
        Everything you need to track, analyze, and grow your trading journey.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 cards">
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-110 duration-700 transition-all card"
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
            <p className="text-gray-600 mt-2">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Features;
