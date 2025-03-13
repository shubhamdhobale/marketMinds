import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <div className="relative flex items-center justify-center min-h-screen px-6 ">
      {/* Background Animation */}

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="relative text-center max-w-3xl z-10"
      >
        <h2 className="text-5xl font-extrabold tracking-wide">
          Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] tracking-wider">Master Your Trades</span>?
        </h2>
        <p className="mt-4 text-lg tracking-wider leading-relaxed">
          Join <span className="font-bold tracking-wider">MarketMinds</span> today and take control of your trading journey with powerful analytics & AI insights.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
         <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-6"
      >
        <Link to="/signup">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative inline-block px-8 py-3 bg-white text-[#4ECCA3] font-bold text-lg rounded-full shadow-lg overflow-hidden transition-all hover:bg-[#4ECCA3] hover:text-white"
          >
            <span className="absolute inset-0 hover:bg-[#4ECCA3] hover:text-white opacity-0 transition-opacity duration-900 hover:opacity-100"></span>
            <span className="relative tracking-wider">Get Started for Free</span>
          </motion.button>
        </Link>
      </motion.div>

          
        </div>
      </motion.div>
    </div>
  );
}
