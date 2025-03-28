import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SideBar from "./SideBar.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { VITE_API_BASE_URL } from "./index.js";

const EquityCurveChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [lineColor, setLineColor] = useState("#FF0000");
  const [sidebarOpen, setSidebarOpen] = useState(false);
    
      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      }; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const response = await axios.get(`${VITE_API_BASE_URL}trade/equity-curve`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });

        if (!response.data.length) {
          setError("No trade data available.");
          return;
        }

        const formattedData = response.data.map((trade) => ({
          date: trade.date, 
          balance: trade.cumulativePnL, 
        }));

        setData(formattedData);

        const lastBalance = formattedData[formattedData.length - 1].balance;
        setLineColor(lastBalance < 0 ? "#FF0000" : "#4CAF50"); 

      } catch (error) {
        // console.error("Error fetching equity curve data:", error);
        setError("Only Premium Access" , error );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen md:flex-row flex-col px-6 md:px-0">

<button
        className="md:hidden p-2 bg-gray-800 text-white mt-24 rounded-lg px-4 cursor-pointer py-2 ml-6 md:ml-0 w-1/2"
        onClick={toggleSidebar}> 
        Menu
      </button>

      <div className="md:block hidden min-h-screen">
        <SideBar />
      </div>

      {/* Mobile Menu */}
      {sidebarOpen && (
                    <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="fixed right-0 w-full sm:w-full h-screen bg-[#11224097] p-6 flex flex-col items-center text-xl gap-6 shadow-lg z-50 top-20">
                      <button className="absolute top-4 right-4 text-[#4ECCA3]" onClick={() => setSidebarOpen(false)}><X size={28} /></button>
                      {['newtrade', 'tradehistory', 'tradesummary', 'equitychart', 'Log Out'].map(item => (
                        <Link key={item} to={`/${item}`} className="text-[#E2E8F0] tracking-wider hover:underline transition duration-300" onClick={() => setSidebarOpen(false)}>
                          {item.charAt(0).toUpperCase() + item.slice(1)}
                        </Link>
                      ))}
                    </motion.div>
      )}


      <div className="w-full p-4 bg-white rounded-md shadow-md md:mt-32 mt-12 md:mx-4 my-4">
        <h2 className="text-lg font-semibold mb-3">Cumulative Profit/Loss (Equity Curve)</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke={lineColor} strokeWidth={2} dot={true} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default EquityCurveChart;
