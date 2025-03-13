"use client";
import {useMotionValueEvent, useScroll, useTransform, motion} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
 
interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}
 
export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
 
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height || 0);
    }
  }, [ref, data]);
 
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });
 
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
 
  return (
    <div className="w-full " ref={containerRef} >
      <div className="max-w-7xl py-20 px-8 text-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-gray-900 tracking-wide"
      >
        How it <span className="text-[#4ECCA3]">Works</span>?
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1, delay: 0.2 }}
        className="text-xl text-gray-700 mt-6 leading-relaxed max-w-4xl mx-auto tracking-wider"
      >
        Follow these simple steps to start mastering your trades with MarketMinds.
      </motion.p>
      </div>
 
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 md:px-0 px-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-center pt-10 pb-5 mb-20"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">

              <div className="h-10 absolute left-0 md:left-3 w-10 rounded-full bg-[#00c3ff16] dark:bg-[#abaaf51b] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[#00c3ff2e] dark:bg-[#00c3ff47] p-2" />
              </div>

              <div className="flex md:pl-16 gap-4 pl-14">
              {item.icon}
              <h3 className="hidden md:block text-xl md:text-2xl font-bold tracking-wider">
                {item.title}
              </h3>
              </div>
            </div>
 
            <div className="relative pl-10 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold ">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-15 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

