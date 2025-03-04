import { motion } from 'framer-motion';
import { FaStar, FaUsers, FaLock, FaLightbulb, FaChartBar, FaRocket, FaSync} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Features from '../components/Features.jsx';
import { TimelineDemo } from '../components/TimelineDemo.jsx';
import Testimonials from '../components/Testimonials.jsx';
import FAQSection from '../components/FAQSection.jsx';
import CTA from '../components/CTA.jsx';
import '.././global.css';
// import ContactUs from '../components/ContactUs.jsx';


const benefits = [
  { icon: <FaStar size={50} className="text-[#FFD700]" />, title: "Proven Success", description: "Backed by data-driven strategies and trusted by top traders globally." },
  { icon: <FaUsers size={50} className="text-[#00c3ff]" />, title: "Expert Community", description: "Engage with experienced traders, mentors, and an ever-growing community." },
  { icon: <FaLock size={50} className="text-[#4ECCA3]" />, title: "Bank-Grade Security", description: "Your data is encrypted and stored securely with multi-layer protection." },
  { icon: <FaLightbulb size={50} className="text-[#FFD700]" />, title: "AI-Powered Insights", description: "Get advanced analytics and AI-driven recommendations to maximize profits." },
  { icon: <FaChartBar size={50} className="text-[#4ECCA3]" />, title: "Real-Time Analytics", description: "Track and optimize trades with real-time performance metrics." },
  { icon: <FaRocket size={50} className="text-[#00c3ff]" />, title: "High Performance", description: "Fast, intuitive, and designed for both beginners and professional traders." },
  { icon: <FaSync size={50} className="text-[#FFD700]" />, title: "Seamless Integration", description: "Sync across devices with cloud-based storage and auto-backups." }
];


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className='mt-28 flex'>
          <motion.img 
          src="https://www.trade-copier.com/images/oneui/brokers/tradingview_rectangle.png" 
          className='w-16 left-68 absolute top-60 glow-effect opacity-70' 
          initial={{ x: Math.random() * 50 - 15, y: 0 }}
          animate={{
            y: [Math.random() * -20, Math.random() * 20, Math.random() * -20],
            x: [Math.random() * -10, Math.random() * 10, Math.random() * -10],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}/>

          <motion.img 
          src="/images/company logo/binance-removebg-preview.png"  
          className='w-20 left-1/4 absolute bottom-32 glow-effect opacity-70'
          initial={{ x: Math.random() * 50 - 15, y: 0 }}
          animate={{
            y: [Math.random() * -20, Math.random() * 20, Math.random() * -20],
            x: [Math.random() * -10, Math.random() * 10, Math.random() * -10],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}/>

          <motion.img 
          src="https://images.seeklogo.com/logo-png/48/2/zerodha-kite-logo-png_seeklogo-487028.png"  
          className='w-12 absolute top-40 right-40 glow-effect opacity-70'
          initial={{ x: Math.random() * 50 - 15, y: 0 }}
          animate={{
            y: [Math.random() * -20, Math.random() * 20, Math.random() * -20],
            x: [Math.random() * -10, Math.random() * 10, Math.random() * -10],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}/>

          <motion.img 
          src="/images/company logo/meta-removebg-preview.png"  
          className='w-26 absolute bottom-48 right-68 glow-effect opacity-70'
          initial={{ x: Math.random() * 50 - 15, y: 0 }}
          animate={{
            y: [Math.random() * -20, Math.random() * 20, Math.random() * -20],
            x: [Math.random() * -10, Math.random() * 10, Math.random() * -10],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}/>

          <motion.img 
          src="/images/company logo/coinbase-new4201-removebg-preview.png"  
          className='w-16 absolute left-1/2 top-32 glow-effect opacity-70'
          initial={{ x: Math.random() * 50 - 15, y: 0 }}
          animate={{
            y: [Math.random() * -20, Math.random() * 20, Math.random() * -20],
            x: [Math.random() * -10, Math.random() * 10, Math.random() * -10],
          }}
          transition={{
            duration: 5 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}/>

        </div>
      {/* Hero Section */}
      <div className="text-center mt-36">
        
      <div className="max-w-3xl mx-auto px-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg font-medium text-gray-700"
        >
          🚀 Master Your Trades with <span className="font-bold text-gray-900">MarketMinds</span>
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-extrabold mt-4 tracking-wider"
        >
          Your Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]">Trading Journal</span>
          <br /> for Consistency & Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="tracking-wider text-lg text-gray-700 mt-5 leading-relaxed"
        >
          Track. Analyze. Improve. <span className="font-bold text-gray-900">MarketMinds</span> helps traders record their trades, analyze performance, and develop <br /> a profitable strategy.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8"
        >
          <button className="inline-block rounded-md bg-[#4ECCA3] border-none text-white px-5 py-3 transition-all duration-500 cursor-pointer m-1 relative overflow-hidden group">
            <Link to="/signup">
              <span className="relative inline-block transition-all duration-500 group-hover:pr-4">
                Get Started for Free
                <span className="absolute opacity-0 top-0 right-[-15px] transition-all duration-500 group-hover:opacity-100 group-hover:right-0">
                  »
                </span>
              </span>
            </Link>
          </button>
        </motion.div>
      </div>
    </div>

      {/* Why MarketMinds  */}
      <div className="mt-24 max-w-7xl">
      <div className="py-20 bg-gradient-to-b px-8 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-gray-900 tracking-wide"
      >
        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]">MarketMinds</span>?
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }}
        className="text-xl text-gray-700 mt-6 leading-relaxed max-w-4xl mx-auto"
      >
        Discover how MarketMinds revolutionizes trading with cutting-edge tools, expert insights, and seamless user experience.
      </motion.p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {benefits.map((benefit, index) => (
          <motion.div 
            key={index} 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all flex flex-col items-center text-center"
          >
            <div className="mb-5">{benefit.icon}</div>
            <h3 className="text-2xl font-bold text-gray-800">{benefit.title}</h3>
            <p className="text-gray-600 mt-3 text-lg leading-snug">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mt-24">
        <Features/>
      </div>
      
      {/* How it works  */}
      <div>
        <TimelineDemo/>
      </div>

      <div>
        <Testimonials/>
      </div>

      <div>
        <FAQSection/>
      </div>

      <div>
        <CTA/>
        <Link to='/newtrade'>Add new Trade</Link>
      </div>

      {/* <div>
        <ContactUs/>  
      </div> */}


    </div>
  );
}
