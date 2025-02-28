import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../redux/authSlice.js";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Importing icons

import logo from "../../public/images/logo-removebg-preview.png";
import userIcon from "../../public/images/user.png";
import arrowDown from "../../public/images/dashboard.webp";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Mobile Menu State

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 w-full h-20 bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#233554] flex items-center justify-between px-6 border-b border-[#4ECCA3] shadow-md backdrop-blur-3xl z-50">
      
      {/* 🔷 Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="MarketMinds Logo" className="h-12" />
        <h1 className="text-[#4ECCA3] text-3xl font-extrabold tracking-wider drop-shadow-lg ml-2">
          MarketMinds
        </h1>
      </Link>

      {/* 🔷 Desktop Menu */}
      <div className="hidden md:flex gap-8 text-[#E2E8F0]">
        <Link to="/features" className="hover:text-[#4ECCA3] transition-all duration-500 transform hover:scale-110">
          Features
        </Link>
        <Link to="/resources" className="hover:text-[#4ECCA3] transition-all duration-500 transform hover:scale-110">
          Resources
        </Link>
        <Link to="/about" className="hover:text-[#4ECCA3] transition-all duration-500 transform hover:scale-110">
          About
        </Link>
        <Link to="/pricing" className="hover:text-[#4ECCA3] transition-all duration-500 transform hover:scale-110">
          Pricing
        </Link>
        <Link to="/brokerSupport" className="hover:text-[#4ECCA3] transition-all duration-500 transform hover:scale-110">
          Broker Support
        </Link>
      </div>

      {/* 🔷 User Section */}
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <div className="relative dropdown-container">
            <button
              className="flex items-center border border-[#4ECCA3] px-6 py-2 rounded-xl hover:bg-[#4ecca220] transition-all shadow-lg transform hover:scale-105"
              onClick={toggleDropDown}
            >
              <img src={userIcon} className="h-4" alt="User Icon" />
              <span className="text-[#4ECCA3] ml-2">
                Hi, {user?.username || "Profile"}
              </span>
              <img src={arrowDown} className="h-3 ml-2" alt="Dropdown Icon" />
            </button>

            {/* Dropdown Menu */}
            {dropDownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 mt-2 w-48 bg-[#112240] border border-[#4ECCA3] rounded-lg shadow-lg overflow-hidden"
              >
                <Link to="/profile" className="block px-4 py-2 text-[#E2E8F0] hover:bg-[#4ECCA3] hover:text-[#0A192F] transition">
                  Profile
                </Link>
                <button
                  className="w-full text-left px-4 py-2 text-[#E2E8F0] hover:bg-[#4ECCA3] hover:text-[#0A192F] transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <Link
            to="/signin"
            className="border border-[#4ECCA3] text-[#4ECCA3] px-6 py-2 rounded-xl hover:bg-[#4ECCA3] hover:text-[#0A192F] transition-all shadow-lg transform hover:scale-105"
          >
            Sign In
          </Link>
        )}

        {/* Get Started Button */}
        <Link to="/signup" className="bg-[#4ECCA3] text-[#0A192F] px-6 py-2 rounded-xl hover:bg-[#3BAF92] transition-all shadow-lg transform hover:scale-105">
          Get Started
        </Link>

        {/* 🔷 Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#4ECCA3] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 🔷 Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-20 right-0 w-64 h-screen bg-[#112240] p-6 flex flex-col items-start shadow-lg z-50"
        >
          <Link to="/features" className="text-[#E2E8F0] py-2">Features</Link>
          <Link to="/resources" className="text-[#E2E8F0] py-2">Resources</Link>
          <Link to="/about" className="text-[#E2E8F0] py-2">About</Link>
          <Link to="/pricing" className="text-[#E2E8F0] py-2">Pricing</Link>
          <Link to="/brokerSupport" className="text-[#E2E8F0] py-2">Broker Support</Link>
        </motion.div>
      )}
    </nav>
  );
};

export default Header;
