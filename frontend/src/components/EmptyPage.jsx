import { motion } from "framer-motion";
import { LucideDatabase } from "lucide-react";

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <LucideDatabase size={80} className="text-gray-500 mb-4" />
        <h1 className="text-2xl font-semibold">No Data Available</h1>
        <p className="text-gray-400 mt-2">Start adding your trading insights to MarketMinds.</p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-medium shadow-lg">
          Add New Entry
        </button>
      </motion.div>
    </div>
  );
};

export default EmptyPage;
