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
  const {  token } = useSelector((state) => state.auth);
  const [forgotEmail, setForgotEmail] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false); 
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  // useEffect(() => {
  //   let timeout;
  //   if (authLoading) {
  //     timeout = setTimeout(() => {
  //       toast("Still signing in…", { icon: "⏳" });
  //     }, 3000);
  //   }
  
  //   return () => clearTimeout(timeout);
  // }, [authLoading]);
  

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
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
    } finally {
      setFormLoading(false);
    }
  
  };
  

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const actionResult = dispatch(signInWithGoogle());
      if (actionResult?.payload?.token) {
        toast.success("Google Sign-In Successful");
        navigate("/profile");
      } else {
        throw new Error("Google Sign-In failed");
      }
    } catch (error) {
      console.error("Google Sign-in Error:", error);
      toast.error("Google Sign-in Failed.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.error("Please enter your email.");
      return;
    }
    try {
      const response = await axios.post(`${VITE_API_BASE_URL}auth/forgot-password`, { email: forgotEmail });
      toast.success(response.data.message || "Password reset link sent!");
      setShowForgotPassword(false); // Close modal after request
    } catch (error) {
      console.error("Forgot Password Error:", error);
      toast.error(error.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-12">
      <div className="border border-gray-300 p-8 w-96 rounded-md shadow-2xl flex flex-col items-center justify-center">
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

          <p className="">
            <Link to="/forgot-password" className="text-blue-700 hover:underline ml-40 tracking-wider text-sm">
                Forgot Password?
            </Link>
          </p>
 
          <button
            type="submit"
            disabled={formLoading}
            className={`${
              formLoading ? "bg-gray-500 cursor-not-allowed" : "bg-[#0A192F] hover:bg-[#233554] hover:scale-105"
            } text-[#E2E8F0] py-2 px-4 rounded-md transition-all duration-700 w-72`}
          >
            {formLoading ? "Signing in..." : "Sign In"}
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
            className={`flex flex-row gap-3 items-center justify-center border border-black px-4 py-2 rounded-lg shadow-lg transition duration-700 cursor-pointer ${
              googleLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-95"
            }`}
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
          >
            <img src={GoogleLogo} alt="Google Logo" className="h-6" />
            <p className="text-md tracking-wider font-semibold">
              {googleLoading ? "Signing in..." : "Continue with Google"}
            </p>
          </button>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-center">Reset Your Password</h2>
            <p className="text-sm text-gray-600 text-center mt-2">Enter your email and we&apos;ll send you a reset link.</p>
            <input
              type="email"
              className="border border-gray-300 rounded-lg p-2 outline-none w-full mt-4"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowForgotPassword(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                Cancel
              </button>
              <button onClick={handleForgotPassword} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
