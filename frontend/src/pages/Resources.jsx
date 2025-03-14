import { useState } from "react";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: 1,
    category: "Trading Tips",
    title: "How to Manage Risk in Trading",
    excerpt: "Learn the essential strategies for risk management...",
    content: "Risk management is crucial for long-term success. Here are the detailed strategies to minimize losses and maximize gains...",
  },
  {
    id: 2,
    category: "Market Analysis",
    title: "Understanding Market Trends",
    excerpt: "A deep dive into market trends and how to analyze them...",
    content: "Market trends play a vital role in trading. This article explains how to spot trends and leverage them for better trading decisions...",
  },
  {
    id: 3,
    category: "Psychology",
    title: "Mastering Trading Psychology",
    excerpt: "Emotional control is key to consistent trading success...",
    content: "Many traders fail due to emotional decisions. Learn how to maintain discipline and develop a strong trading mindset...",
  },
];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState(null);

  const handleFilter = (category) => {
    setSelectedCategory(category);
    setExpandedPost(null);
  };

  const handleExpand = (id) => {
    setExpandedPost(expandedPost === id ? null : id);
  };

  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen mt-40 md:px-4 px-10">
      <h2 className="text-5xl font-extrabold text-center text-gray-800 mb-8">
        Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ECCA3] to-[#00c3ff]">Blog & Resources</span>
      </h2>
      
      {/* Category Filters */}
      <div className="flex justify-center gap-2 mb-8 md:px-2 px-6">
        {["All", "Trading Tips", "Market Analysis", "Psychology"].map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-5 py-2 rounded-lg text-white transition-all duration-300 cursor-pointer ${
              selectedCategory === category ? "bg-[#4ECCA3]" : "bg-gray-500 hover:bg-gray-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Masonry Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            layout
            className={`p-6 rounded-lg shadow-2xl bg-white ${
              expandedPost === post.id ? "col-span-2 row-span-2 z-10 scale-100" : ""
            }`}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-4">
              {expandedPost === post.id ? post.content : post.excerpt}
            </p>
            <button
              onClick={() => handleExpand(post.id)}
              className="mt-2 text-[#4ECCA3] font-semibold underline hover:text-[#00c3ff] transition-all duration-300 cursor-pointer"
            >
              {expandedPost === post.id ? "Show Less" : "Read More"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
