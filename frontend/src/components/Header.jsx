import { Link } from "react-router-dom";

const Header = () => {
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
        <button className="border border-[#4ECCA3] text-[#4ECCA3] px-6 py-2 rounded-xl hover:bg-[#4ECCA3] hover:text-[#0A192F] transition-all shadow-lg transform hover:scale-105"><Link to='/signin'> Sign In </Link></button>
        <button className="bg-[#4ECCA3] text-[#0A192F] px-6 py-2 rounded-xl hover:bg-[#3BAF92] transition-all shadow-lg transform hover:scale-105"><Link to='/signup'> Get Started</Link></button>
      </div>
    </nav>
  );
};

export default Header;