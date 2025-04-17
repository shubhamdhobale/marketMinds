import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-transparent px-4 overflow-hidden backdrop-blur-md">

      {/* Floating Astronaut */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 right-10 z-0 w-24 md:w-32"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          fill="currentColor"
          className="text-white drop-shadow-lg"
        >
          <path d="M32 2a8 8 0 0 0-8 8v5h2V10a6 6 0 0 1 12 0v5h2v-5a8 8 0 0 0-8-8zM16 22a16 16 0 0 1 32 0v8a16 16 0 0 1-32 0v-8zm-2 0v8a18 18 0 0 0 36 0v-8a18 18 0 0 0-36 0zM24 52v-6h16v6H24zm-2 2h20v-10H22v10z"/>
          <circle cx="32" cy="24" r="10" fill="#4ECCA3" />
          <path d="M30 18h4v12h-4z" fill="white"/>
        </svg>
      </motion.div>

      {/* Floating Background Blobs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute w-72 h-72 bg-[#00c3ff]/30 rounded-full blur-3xl top-10 left-10 z-0"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute w-56 h-56 bg-[#4ECCA3]/30 rounded-full blur-2xl bottom-10 right-10 z-0"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center max-w-xl w-full px-6 py-10 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
      >
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
          className="text-[100px] md:text-[140px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]"
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-2xl md:text-3xl font-bold text-white mb-4"
        >
          Lost in the Data Universe
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-gray-200 text-sm md:text-base mb-6"
        >
          This page has gone rogue or never existed. Let’s get you back on course!
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-[#00c3ff] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#009ac7] transition duration-300"
        >
          Back to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
