import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaChartLine, FaTrophy } from "react-icons/fa";
// import ReactPlayer from "react-player";
import Team from "../components/Team";
// import  logo from '../assets/images/logo.png'

const stats = [
  { icon: <FaUsers size={40} className="text-[#4ECCA3]" />, label: "Active Traders", value: 100 },
  { icon: <FaChartLine size={40} className="text-[#FFD700]" />, label: "Trades Logged", value: 2000 },
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
    <div className="min-h-screen py-16 px-6 mt-24 relative z-0">
       {/* Video Background */}
       {/* <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30">
        <ReactPlayer url="https://youtu.be/LMzBfWpHRgc" playing loop muted width="100%" height="100%" className="object-cover" />
      </div> */}

      {/* <div className="absolute w-80 left-2/5 top-20 -z-10">
        <img src={logo} alt="" className=" w-full h-full opacity-30 z-0 drop-shadow-[0_0px_30px_rgba(200,0,0,0.5)]"/>
      </div> */}

      <motion.h2
        className="text-5xl font-extrabold text-center mb-12 tracking-wider"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
         About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] tracking-wider">MarketMinds</span>
      </motion.h2>

      <motion.p 
        className="text-lg text-center max-w-3xl text-gray-500 mb-12 mx-auto tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        whileInView={{ y: [20, 0] }}
      >
        MarketMinds is a powerful AI-driven trading journal that helps traders log, analyze, and optimize their trades for maximum profitability. Designed for both beginners and experts, it empowers users with data-driven insights, risk management tools, and real-time performance tracking.
      </motion.p>


      {/* Stats Section */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-16 max-w-6xl mx-auto relative z-10">
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
      <motion.h2
        className=" font-extrabold text-center mb-16 tracking-wide leading-tight"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="opacity-50 tracking-wider text-xl shadow-2xl">Our{" "}</span>
        <span className="relative inline-block">
        <span className="drop-shadow-2xl text-4xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] bg-clip-text text-transparent ">
          Evolutionary
        </span>
        <span className="absolute left-0 bottom-0 md:w-84 sm:w-60 w-40 h-1 bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] animate-pulse rounded-full" />
      </span>

        <br />
        <span className=" text-4xl mr-36 drop-shadow-2xl tracking-widest opacity-50 font-extrabold font-sans">Timeline</span>
      </motion.h2>

        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#4ECCA3] rounded-lg"></div>
        {timeline.map((item, index) => (
          <motion.div
            key={index}
            className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} items-center mb-12 relative`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className=" p-6 rounded-lg shadow-2xl md:w-64 w-44 relative z-10">
              <h3 className="text-2xl font-bold">{item.year}</h3>
              <p className="text-lg ">{item.event}</p>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-[#4ECCA3] w-6 h-6 rounded-full"></div>
          </motion.div>
        ))}
      </div>

      {/* Interactive Team Section */}
      {/* <div className="mt-40 py-10">
        <motion.h3 className="text-5xl font-extrabold text-center mb-12" whileInView={{ opacity: 1, y: [50, 0] }}>Meet Our 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] "> Team</span> </motion.h3>
        <div className="flex justify-center gap-8 flex-wrap">
          {team.map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg text-center w-72 cursor-pointer transition-all duration-300 hover:scale-95"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img src={member.img} className="rounded-full w-20 mb-4"/>
              <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
              <p className="text-gray-600 mb-4">{member.role}</p>
              <div className="flex justify-center gap-4">
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} className="text-[#0077B5] hover:text-[#005582]" />
                </a>
                <a href={member.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={24} className="text-black hover:text-gray-700" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}
      <Team/>
    </div>
  );
}
