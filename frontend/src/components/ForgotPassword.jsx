import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { VITE_API_BASE_URL } from "../components/index.js";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${VITE_API_BASE_URL}auth/forgot-password`, { email });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="border p-6 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-md"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
