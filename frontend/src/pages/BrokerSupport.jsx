import { useState, useEffect, useRef } from "react";
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
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let animation;
    if (!isHovered) {
      animation = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollLeft += 1;
        }
      }, 30);
    }
    return () => clearInterval(animation);
  }, [isHovered]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-20 bg-gray-100">
      <h2 className="text-3xl md:text-5xl font-extrabold text-center text-gray-800 mb-10 tracking-wider">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] tracking-wider">Partners</span> & Integrations
      </h2>

      {/* Auto-Scrolling Container with Hover Pause */}
      <div
        className="relative max-w-full overflow-hidden flex space-x-4 py-5 w-[90%] md:w-[70%]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        ref={scrollRef}
      >
        <motion.div className="flex space-x-6 flex-nowrap">
          {partners.concat(partners).map((partner, index) => (
            <motion.div
              key={index}
              whileHover={{ rotateY: 10, rotateX: 10, scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer relative p-4 rounded-xl bg-white shadow-lg transition-all transform hover:shadow-2xl w-[100px] md:w-[150px]"
              onClick={() => setSelectedPartner(partner)}
            >
              <img src={partner.logo} alt={partner.name} className="object-contain w-full h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Partner Details Pop-Up */}
      {selectedPartner && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setSelectedPartner(null)}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs sm:max-w-md"
          >
            <h3 className="text-xl md:text-2xl font-bold">{selectedPartner.name}</h3>
            <p className="text-gray-600 mt-2">{selectedPartner.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#4ECCA3] text-white rounded-md hover:bg-[#3ba98b] transition"
              onClick={() => setSelectedPartner(null)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
