import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../redux/authSlice.js";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.png";
import userIcon from "../assets/images/user.png";
import arrowDown from "../assets/images/arrow down.png"; 

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token") && !user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".dropdown-container")) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const toggleDropDown = () => setDropDownOpen(!dropDownOpen);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="fixed top-0 w-full h-20 bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#233554] flex items-center justify-between px-6 md:px-6 border-b border-[#4ECCA3] shadow-md backdrop-blur-3xl z-50">
      
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="MarketMinds Logo" className="h-12 w-auto" />
        <h1 className="text-[#4ECCA3] text-xl md:text-3xl font-extrabold tracking-wider ml-2">
          MarketMinds
        </h1>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 lg:gap-8 text-[#E2E8F0] text-sm tracking-wider">
        {['features', 'resources', 'about', 'pricing', 'brokerSupport'].map(item => (
          <Link key={item} to={`/${item}`} className="hover:text-[#4ECCA3] transition-all duration-300 transform hover:scale-110">
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Link>
        ))}
      </div>

      {/* User & Mobile Menu Section */}
      <div className="flex items-center gap-4 md:gap-6">
        {isAuthenticated ? (
          <div className="relative dropdown-container">
            <button className="flex items-center border border-[#4ECCA3] px-4 py-2 md:px-6 md:py-2 rounded-xl hover:bg-[#4ecca220] transition-all shadow-lg transform hover:scale-105" onClick={toggleDropDown}>
              <img src={userIcon} className="h-4" alt="User Icon" />
              <span className="text-[#4ECCA3] ml-2 hidden md:inline">Hi, {user?.username || "Profile"}</span>
              <img src={arrowDown} className="h-3 ml-2" alt="Dropdown Icon" />
            </button>
            {dropDownOpen && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="absolute right-0 mt-2 w-48 bg-[#112240] border border-[#4ECCA3] rounded-lg shadow-lg overflow-hidden">
                <Link to="/profile" className="block px-4 py-2 text-[#E2E8F0] hover:bg-[#4ECCA3] hover:text-[#0A192F] transition">Profile</Link>
                <button className="w-full text-left px-4 py-2 text-[#E2E8F0] hover:bg-[#4ECCA3] hover:text-[#0A192F] transition" onClick={handleLogout}>Logout</button>
              </motion.div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="border border-[#4ECCA3] text-[#4ECCA3] px-4 py-2 md:px-6 md:py-2 md:text-sm rounded-xl hover:bg-[#4ECCA3] hover:text-[#0A192F] transition-all shadow-lg transform hover:scale-105">Sign In</Link>
        )}

        <Link to="/signup" className="hidden md:block bg-[#4ECCA3] text-[#0A192F] px-6 py-2 rounded-xl hover:bg-[#3BAF92] transition-all shadow-lg transform hover:scale-105 md:text-sm">Get Started</Link>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[#4ECCA3] p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="fixed right-0 w-full sm:w-full h-screen bg-[#11224097] p-6 flex flex-col items-center text-xl gap-6 shadow-lg z-50 top-20">
          <button className="absolute top-4 right-4 text-[#4ECCA3]" onClick={() => setMenuOpen(false)}><X size={28} /></button>
          {['features', 'resources', 'about', 'pricing', 'brokerSupport'].map(item => (
            <Link key={item} to={`/${item}`} className="text-[#E2E8F0] tracking-wider hover:underline transition duration-300" onClick={() => setMenuOpen(false)}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Header;
