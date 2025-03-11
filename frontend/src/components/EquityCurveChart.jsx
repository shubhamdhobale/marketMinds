import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import SideBar from "./SideBar.jsx";

const EquityCurveChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [lineColor, setLineColor] = useState("#FF0000"); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }
        const response = await axios.get("http://localhost:5000/api/trade/equity-curve", {
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
        console.error("Error fetching equity curve data:", error);
        setError("Failed to load equity curve. Please login again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="w-full p-4 bg-white rounded-md shadow-md mt-32 mx-4 my-4">
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
