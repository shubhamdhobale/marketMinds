import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "../redux/authSlice.js";

const Header = () => {
  const { isAuthenticated , user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropDownOpen , setDropDownOpen] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("token") && !user){
      dispatch(fetchUserProfile());
    }
  }, [dispatch , user]);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if(!event.target.closest('.dropdown-container')){
        setDropDownOpen(false);
      }
    };
    document.addEventListener("click" , handleClickOutside);
    return () => {
      document.removeEventListener("click" ,handleClickOutside);
    };
  } , []);

  const handleLogout = () => {
      dispatch(logout());
      navigate("/signin");
    };

  return (
    <nav className="w-full h-24 bg-gradient-to-r from-[#0A192F] via-[#112240] to-[#233554] flex items-center justify-between px-6 shadow-3xl border-b border-[#4ECCA3]">
      <Link to='/'>
        <div className="flex flex-row items-center justify-center">
          <img src="../../public/images/logo-removebg-preview.png" alt="" className="h-16"/>
          <h1 className="text-[#4ECCA3] text-3xl font-extrabold tracking-wider drop-shadow-lg">MarketMinds</h1>
        </div>
      </Link>
      
      <div className="hidden md:flex gap-8 text-[#E2E8F0] ">
        <Link to='/featues' className="hover:text-[#4ECCA3] transition duration-300 ease-in-out transform hover:scale-110">Features</Link>
        <Link to='/resources' className="hover:text-[#4ECCA3] transition duration-300 ease-in-out transform hover:scale-110">Resources</Link>
        <Link to='/about' className="hover:text-[#4ECCA3] transition duration-300 ease-in-out transform hover:scale-110">About</Link>
        <Link to='/pricing' className="hover:text-[#4ECCA3] transition duration-300 ease-in-out transform hover:scale-110">Pricing</Link>
        <Link to='/brokerSupport' className="hover:text-[#4ECCA3] transition duration-300 ease-in-out transform hover:scale-110">Broker Support</Link>
      </div>      
      
      <div className="flex items-center gap-6">
      {isAuthenticated ? (
        <div className="relative dropdown-container">
        <div
          className="flex flex-row items-center justify-center gap-2 border border-[#4ECCA3] px-6 py-2 rounded-xl hover:bg-[#4ecca220] duration-700 transition-all shadow-lg transform hover:scale-105 cursor-pointer"
          onClick={toggleDropDown}
        >
          <img src="../../public/images/user.png" className="h-4" />
          <span className="text-[#4ECCA3]">Hii, {user?.username || "Profile"}</span>
          <img src="../../public/images/arrow down.png" className="h-3" />
        </div>

        {/* Dropdown Menu */}
        {dropDownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-[#112240] border border-[#4ECCA3] rounded-lg shadow-lg overflow-hidden">
            <Link to="/profile" className="block px-4 py-2 text-[#E2E8F0] hover:bg-[#4ECCA3] hover:text-[#0A192F] transition">
              Profile
            </Link>
            <button
              className="w-full text-left px-4 py-2 text-[#E2E8F0] hover:bg-[#4ECCA3] hover:text-[#0A192F] transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
        ) : (
          <Link to="/signin" className="border border-[#4ECCA3] text-[#4ECCA3] px-6 py-2 rounded-xl hover:bg-[#4ECCA3] hover:text-[#0A192F] transition-all shadow-lg transform hover:scale-105">
            Sign In
          </Link>
        )}
        <button className="bg-[#4ECCA3] text-[#0A192F] px-6 py-2 rounded-xl hover:bg-[#3BAF92] transition-all shadow-lg transform hover:scale-105"><Link to='/signup'> Get Started</Link></button>
      </div>
    </nav>
  );
};

export default Header;