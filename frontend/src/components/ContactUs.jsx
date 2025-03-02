import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required!";
    if (!form.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email!";
    }
    if (!form.message.trim()) newErrors.message = "Message cannot be empty!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl p-8 rounded-2xl shadow-2xl"
      >
        <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-6">
          📩 Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "email", "message"].map((field, index) => (
            <motion.div
              key={field}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={form[field]}
                onChange={handleChange}
                className={`peer w-full px-4 py-3 border rounded-lg shadow-md text-gray-900 focus:outline-none ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              <label
                className={`absolute left-4 top-3 text-gray-500 text-sm transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#4ECCA3]`}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </motion.div>
          ))}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#4ECCA3] text-white font-semibold py-3 rounded-lg transition-all"
          >
            Send Message 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
