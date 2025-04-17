import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaChartLine,
  FaShieldAlt,
  FaWallet,
  FaBitcoin,
  FaCogs,
  FaUserShield,
  FaMobileAlt,
  FaCoins,
  FaRocket,
  FaUsers
} from "react-icons/fa";

const partners = [
  {
    name: "TradingView",
    logo: "https://www.trade-copier.com/images/oneui/brokers/tradingview_rectangle.png",
    link: "https://www.tradingview.com/",
    description: "TradingView is the most powerful charting platform for traders and investors. With real-time market data and a community of over 30 million users, it's the go-to tool for in-depth analysis.",
    features: [
      { icon: <FaChartLine />, text: "Advanced real-time charting tools" },
      { icon: <FaUsers />, text: "30M+ active global traders" },
      { icon: <FaCogs />, text: "Custom indicators & strategy testing" },
    ]
  },
  {
    name: "Binance",
    logo: "https://thumbs.dreamstime.com/b/print-347511194.jpg",
    link: "https://www.binance.com/",
    description: "Binance is the world’s leading crypto exchange offering fast, secure, and diverse trading options for beginners and pros alike.",
    features: [
      { icon: <FaBitcoin />, text: "350+ cryptocurrencies supported" },
      { icon: <FaRocket />, text: "High-speed trade execution" },
      { icon: <FaShieldAlt />, text: "Multi-layer security" },
    ]
  },
  {
    name: "MetaTrader 4",
    logo: "https://www.bestbrokers.com/wp-content/uploads/2024/12/mt4-logo-1x1-1.jpg",
    link: "https://www.metatrader4.com/",
    description: "MetaTrader 4 (MT4) is the most widely used forex trading platform. Ideal for expert traders, it supports automated trading and a variety of analysis tools.",
    features: [
      { icon: <FaCogs />, text: "Custom indicators & expert advisors" },
      { icon: <FaChartLine />, text: "Advanced forex trading analytics" },
      { icon: <FaUserShield />, text: "Strong trader privacy tools" },
    ]
  },
  {
    name: "Coinbase",
    logo: "https://logowik.com/content/uploads/images/coinbase-new4201.jpg",
    link: "https://www.coinbase.com/",
    description: "Coinbase makes crypto easy for everyone. It offers a clean interface, top-notch security, and regulatory compliance ideal for long-term investors.",
    features: [
      { icon: <FaShieldAlt />, text: "Fully regulated in the US" },
      { icon: <FaWallet />, text: "Secure digital wallets" },
      { icon: <FaMobileAlt />, text: "Easy-to-use mobile experience" },
    ]
  },
  {
    name: "Robinhood",
    logo: "https://logos-world.net/wp-content/uploads/2021/03/Logo-Robinhood.png",
    link: "https://robinhood.com/",
    description: "Robinhood changed the investing world with zero-commission trading. It’s perfect for beginners wanting quick access to stocks, ETFs, and crypto.",
    features: [
      { icon: <FaCoins />, text: "Zero-commission stock & crypto trades" },
      { icon: <FaChartLine />, text: "Live market data & alerts" },
      { icon: <FaMobileAlt />, text: "Intuitive trading on mobile" },
    ]
  },
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all z-50"
        onClick={() => setSelectedPartner(null)}
      >
      
      
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs sm:max-w-md relative z-50"
      onClick={(e) => e.stopPropagation()} // prevent closing on button click
    >
      <h3 className="text-xl md:text-2xl font-bold">{selectedPartner.name}</h3>
      <p className="text-gray-600 mt-2">{selectedPartner.description}</p>
      <ul className="mt-4 space-y-2 text-left">
        {selectedPartner.features?.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-gray-700">
            <span className="text-[#4ECCA3]">{feature.icon}</span>
            <span>{feature.text}</span>
          </li>
        ))}
      </ul>

      <div className="flex gap-4 justify-center mt-6">
        <a
          href={selectedPartner.link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#4ECCA3] text-white rounded-md hover:bg-[#4ecca2ba] transition"
        >
          Connect Now
        </a>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          onClick={() => setSelectedPartner(null)}
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
)}

    </div>
  );
}
