import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const testimonials = [
  {
    name: "Mayur Jathar",
    feedback:
      "MarketMinds transformed my trading strategy! The AI insights helped me improve my risk management and increase my profits.",
    rating: 5,
    image: "/assets/testimonial photo/mayur photo.jpeg",
  },
  {
    name: "Rohan Khaire",
    feedback:
      "I love how easy it is to log my trades and analyze my performance. MarketMinds keeps me disciplined and consistent.",
    rating: 4.5,
    image: "/assets/testimonial photo/rohan photo.jpeg",
  },
  {
    name: "Shashi Kapur",
    feedback:
      "The 3D visualization and trading journal features are simply amazing. Highly recommend for traders of all levels!",
    rating: 5,
    image: "/assets/testimonial photo/shashi photo.jpeg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-6 ">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-12 tracking-wider">
        What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff] tracking-wider">Traders</span> Say
      </h2>
      <div className="relative w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, rotateY: -90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: 90 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative px-20 py-8 rounded-xl shadow-2xl flex flex-col items-center text-center backdrop-blur-lg border border-white border-opacity-30"
          >
            <img
              src={testimonials[currentIndex].image}
              alt={testimonials[currentIndex].name}
              className="w-24 h-24 rounded-full mb-4 border-4 border-[#4ECCA3] shadow-lg"
            />
            <FaQuoteLeft className="text-gray-400 text-3xl mb-2" />
            <p className="text-lg italic font-semibold">
              {testimonials[currentIndex].feedback}
            </p>
            <FaQuoteRight className="text-gray-400 text-3xl mt-2" />
            <h3 className="mt-4 text-2xl font-normal">
              {testimonials[currentIndex].name}
            </h3>
            <div className="flex mt-2">
              {Array.from({ length: 5 }, (_, i) => (
                <span
                  key={i}
                  className={`text-yellow-400 text-2xl transition-all duration-300 ${
                    i < testimonials[currentIndex].rating ? "scale-110" : "opacity-40"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[#4ECCA3] p-2 duration-500 rounded-full text-white shadow-md hover:scale-110 transition-all"
        >
          <IoIosArrowBack size={28} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#4ECCA3] p-2 duration-500 rounded-full text-white shadow-md hover:scale-110 transition-all"
        >
          <IoIosArrowForward size={28} />
        </button>
      </div>
    </div>
  );
}
