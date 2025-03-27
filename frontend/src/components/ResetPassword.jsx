import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { VITE_API_BASE_URL } from "../components/index.js";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("Reset Token:", token);
        console.log("API Base URL:", VITE_API_BASE_URL);

        try {
            const response = await axios.post(`${VITE_API_BASE_URL}auth/reset-password/${token}`, { password });
            await toast.success(response.data.message);
            navigate("/signin");
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="border p-6 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded-md"
                        required
                    />
                    <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
