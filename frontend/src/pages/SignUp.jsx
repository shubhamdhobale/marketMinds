import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
      console.log("User Registered -> ",response);
      toast.success("Signup Successful!"); // Handle success message
      navigate('/signin')
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error("Signup Failed! Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-16">
      <div className="border border-black p-8 w-96 rounded-md shadow-2xl flex flex-col items-center justify-center">
        <div className="text-center flex items-center justify-center flex-col">
          <img src="/images/logo.png" alt="" className="h-40"/>
          <h1 className="text-2xl font-bold text-[#0A192F] tracking-wide">Welcome to MarketMinds</h1>
          <p className="text-[#0A192F] tracking-wide py-2 text-sm">📈 Trade Smart, Track Better.</p>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4 p-4">
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              className="border border-black rounded-lg p-2 outline-none w-68" 
              placeholder="Username"
              required
            />
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="border border-black rounded-lg p-2 outline-none w-68" 
              placeholder="Email"
              required
            />
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              className="border border-black rounded-lg p-2 outline-none w-68" 
              placeholder="Create Password"
              required
            />
            <button type="submit" className="bg-[#0A192F] text-[#E2E8F0] py-2 px-4 rounded-md hover:bg-[#233554] transition-all duration-700 hover:scale-105 mt-4">
              Sign Up
            </button>
          </form>
        </div>
        <div>
          <p>Already have an account? <span className="text-blue-700 hover:underline transition duration-900 font-semibold"><Link to='/signin'>Sign In</Link></span></p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <div>
            <p className="tracking-wider">OR</p>
          </div>
          <div className="flex flex-row gap-3 items-center justify-center border border-black px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition duration-700 cursor-pointer">
            <img src="../../public/images/google.png" alt="" className="h-6"/>
            <p className="text-md tracking-wider font-semibold">Continue with Google</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
