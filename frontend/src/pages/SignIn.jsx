import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, login, signInWithGoogle } from "../redux/authSlice.js";
import logo from '../assets/images/logo.png';
import GoogleLogo from '../assets/images/google.png';
import { VITE_API_BASE_URL } from "../components/index.js";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    // If token exists, redirect to profile
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        `${VITE_API_BASE_URL}auth/signin`,
        formData,
        { withCredentials: true }
      );
  
      const { token, user } = response.data; 
      if (!token) throw new Error("Token not received");
  
      // Dispatch Redux action to store token in state
      dispatch(login({ token, user })); 
  
      // Ensure token is immediately available for API calls
      await dispatch(fetchUserProfile());
  
      toast.success("Sign In Successful");
      navigate("/profile");
  
    } catch (error) {
      console.error("Signin Error:", error);
      toast.error(error.response?.data?.message || "Signin Failed. Try Again.");
    }
  };
  

  const handleGoogleSignIn = async () => {
    try {
      dispatch(signInWithGoogle());
      navigate('/profile');
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      toast.error("Google Sign-in Failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-12">
      <div className="border border-black p-8 w-96 rounded-md shadow-2xl flex flex-col items-center justify-center">
        <div className="text-center flex items-center justify-center flex-col">
          <img src={logo} alt="Logo" className="h-40" />
          <h1 className="text-2xl font-bold text-[#0A192F] tracking-wide">
            Welcome to MarketMinds
          </h1>
          <p className="text-[#0A192F] tracking-wide py-2 text-sm">📈 Trade Smart, Track Better.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-4 p-4 w-full"
        >
          <input
            type="email"
            name="email"
            className="border border-gray-300 rounded-lg p-2 outline-none w-72"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="border border-gray-300 rounded-lg p-2 outline-none w-72"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-[#0A192F] text-[#E2E8F0] py-2 px-4 rounded-md hover:bg-[#233554] transition-all duration-700 hover:scale-105 mt-4 w-72"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-2">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-700 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>

        <div className="flex flex-col items-center justify-center gap-2 mt-4">
          <p className="tracking-wider">OR</p>
          <button 
            className="flex flex-row gap-3 items-center justify-center border border-black px-4 py-2 rounded-lg shadow-lg hover:scale-105 transition duration-700 cursor-pointer"
            onClick={handleGoogleSignIn}
          >
            <img src={GoogleLogo} alt="Google Logo" className="h-6" />
            <p className="text-md tracking-wider font-semibold">Continue with Google</p>
          </button>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
