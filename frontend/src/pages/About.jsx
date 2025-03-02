import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaChartLine, FaTrophy } from "react-icons/fa";

const stats = [
  { icon: <FaUsers size={40} className="text-[#4ECCA3]" />, label: "Active Traders", value: 5000 },
  { icon: <FaChartLine size={40} className="text-[#FFD700]" />, label: "Trades Logged", value: 200000 },
  { icon: <FaTrophy size={40} className="text-[#FF5733]" />, label: "Success Rate", value: 95 },
];

const timeline = [
  { year: "2024", event: "Founded MarketMinds" },
  { year: "2024", event: "Launched AI-driven analytics" },
  { year: "2025", event: "Reached 1K active traders" },
  { year: "2025", event: "Expanded globally" },
];

export default function AboutSection() {
  return (
    <div className="min-h-screen py-16 px-6 mt-24">
      <motion.h2
        className="text-5xl font-extrabold text-center mb-12"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
         About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]">MarketMinds</span>
      </motion.h2>

      <motion.p 
        className="text-lg text-center max-w-3xl text-gray-500 mb-12 mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        MarketMinds is a powerful AI-driven trading journal that helps traders log, analyze, and optimize their trades for maximum profitability. Designed for both beginners and experts, it empowers users with data-driven insights, risk management tools, and real-time performance tracking.
      </motion.p>


      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-16 max-w-6xl mx-auto">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-xl shadow-2xl hover:scale-105 transition-transform"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
          >
            {stat.icon}
            <h3 className="text-4xl font-bold my-3 text-black">
              <CountUp end={stat.value} duration={3} />+
            </h3>
            <p className="text-lg">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Timeline Section */}
      <div className="relative max-w-4xl mx-auto mt-40">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#4ECCA3] rounded-lg"></div>
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} items-center mb-12 relative`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className=" p-6 rounded-lg shadow-2xl w-64 relative z-10">
              <h3 className="text-2xl font-bold">{item.year}</h3>
              <p className="text-lg ">{item.event}</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#4ECCA3] w-6 h-6 rounded-full"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
