import { useState } from "react";
import { motion } from "framer-motion";

const partners = [
  { name: "TradingView", logo: "https://www.trade-copier.com/images/oneui/brokers/tradingview_rectangle.png", description: "Advanced charting and market analysis." },
  { name: "Binance", logo: "https://thumbs.dreamstime.com/b/print-347511194.jpg", description: "Leading crypto exchange and trading tools." },
  { name: "MetaTrader 4", logo: "https://www.bestbrokers.com/wp-content/uploads/2024/12/mt4-logo-1x1-1.jpg", description: "Professional forex trading platform." },
  { name: "Coinbase", logo: "https://logowik.com/content/uploads/images/coinbase-new4201.jpg", description: "Secure cryptocurrency trading." },
  { name: "Robinhood", logo: "https://logos-world.net/wp-content/uploads/2021/03/Logo-Robinhood.png", description: "User-friendly stock trading app." },
];

export default function BrokerSupport() {
  const [selectedPartner, setSelectedPartner] = useState(null);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 py-12">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-10">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]">Partners</span> & Integrations
      </h2>

      {/* Auto-Scrolling Container */}
      <div className="relative w-full max-w-7xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 bottom-0 bg-gradient-to-r from-gray-100 via-transparent to-gray-100 pointer-events-none w-full"></div>

        <motion.div
          className="flex space-x-10 py-5 max-w-full w-full h-full"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        >
          {partners.concat(partners).map((partner, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, boxShadow: "0px 10px 30px rgba(78, 204, 163, 0.3)" }}
              className="cursor-pointer relative p-4 rounded-xl bg-white shadow-lg transition-all transform hover:shadow-2xl w-full"
              onClick={() => setSelectedPartner(partner)}
            >
              <img src={partner.logo} alt={partner.name} className=" object-contain w-full h-full" />
            </motion.div>
          ))} 
        </motion.div>
      </div>

      {/* Partner Details Pop-Up */}
      {selectedPartner && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedPartner(null)}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h3 className="text-2xl font-bold">{selectedPartner.name}</h3>
            <p className="text-gray-600 mt-2">{selectedPartner.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#4ECCA3] text-white rounded-md hover:bg-[#3ba98b] transition"
              onClick={() => setSelectedPartner(null)}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
