import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, fetchUserTrades } from "../redux/authSlice.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {toast} from "react-toastify";
import { fetchMonthlyPnL } from "../redux/pnlSlice.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {jwtDecode} from "jwt-decode";
import { VITE_API_BASE_URL } from "./index.js";
import axios from "axios";
import { debounce } from "lodash";


const Dashboard = React.memo(() => {
  const dispatch = useDispatch();
  const {  trades = [], loading, tradeLoading, error, tradeError } = useSelector((state) => state.auth);
  const { monthlyPnL = 0} = useSelector((state) => state.pnl) || {};
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const user = useSelector((state) => state.auth.user); // Get user info
  const token = useSelector((state) => state.auth.token);
  // console.log("User: ", user)
  // const token = localStorage.getItem("token");
  // console.log("Redux State:", { user, token });
  // console.log("Redux Token:", token);
  // const userId = user?.id || localStorage.getItem("userId"); 
  // if (!userId) {
  //     console.error("User ID is missing");
  //     return;
  // }

  const decoded = jwtDecode(token);
  // console.log(decoded);

  const userId = decoded?.id;
  // console.log("User ID:", userId);
  
  const fetchData = debounce( async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const response = await axios.get(
        `${VITE_API_BASE_URL}trade/pnl/monthly/${userId}/${year}/${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);
    }
  } , 500);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth() + 1;
    dispatch(fetchMonthlyPnL({ userId, year, month }));
    // dispatch(fetchStreaks(userId));
  }, [selectedMonth, dispatch, userId]);

  useEffect(() => {
    if (!user) dispatch(fetchUserProfile());
    if (trades.length === 0) dispatch(fetchUserTrades());
  }, [dispatch, user, trades]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(trades);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trades");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"});
    saveAs(data, "TradeData.xlsx");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  
  const totalPnL = trades.reduce((acc, trade) => acc + trade.pnl, 0);
  const profitableTrades = trades.filter(trade => trade.pnl > 0).length;
  const lossTrades = trades.length - profitableTrades;
  const tradeData = trades.map(trade => ({ name: trade.ticker, PNL: trade.pnl }));

  // Convert trade data to { "YYYY-MM-DD": totalPnL }
  const tradePnLMap = trades.reduce((acc, trade) => {
    const tradeDate = new Date(new Date(trade.date).getTime() - new Date(trade.date).getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]; 

    acc[tradeDate] = (acc[tradeDate] || 0) + trade.pnl;
    return acc;
}, {});


  const aggregatedData = tradeData.reduce((acc, trade) => {
    if (acc[trade.name]) {
      acc[trade.name] += trade.PNL; 
    } else {
      acc[trade.name] = trade.PNL; 
    }
    return acc;
  }, {});

  const processedTradeData = Object.keys(aggregatedData).map((ticker) => ({
    name: ticker,
    PNL: aggregatedData[ticker],
  }));

  // Handle date click to filter trades
  const handleDateClick = (date) => {
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
  
    setSelectedDate(localDate);
    setFilteredTrades(trades.filter((trade) => trade.date.startsWith(localDate)));
  };
  
  const pieData = [
    { name: "Profitable Trades", value: profitableTrades },
    { name: "Loss Trades", value: lossTrades }
  ];

  const COLORS = ['#28a745', '#dc3545'];

  const sortTrades = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTrades = [...trades].sort((a, b) => {
    if (!sortConfig.key) return 0;
    if (typeof a[sortConfig.key] === "string") {
      return sortConfig.direction === "asc"
        ? a[sortConfig.key].localeCompare(b[sortConfig.key])
        : b[sortConfig.key].localeCompare(a[sortConfig.key]);
    }
    return sortConfig.direction === "asc"
      ? a[sortConfig.key] - b[sortConfig.key]
      : b[sortConfig.key] - a[sortConfig.key];
  });
  

  const handleDeleteTrade = (tradeId) => {
    // Fetch token from Redux store

    if (!token) {
      console.error("🚨 User is not logged in! Token is missing.");
      toast.error("You must be logged in to delete trades.");
      return;
    }

    console.log("🛠 Token found:", token); // Debugging: Check if token exists

    toast.warn(
      <div>
        <p>Are you sure you want to delete this trade?</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <button
            onClick={() => {
              dispatch(deleteTrade(tradeId))
                .then((result) => {
                  if (result.meta.requestStatus === "fulfilled") {
                    toast.success("Trade deleted successfully!");
                  } else {
                    console.error("🚨 Delete Failed:", result);
                    toast.error(result.payload || "Failed to delete trade. Try again.");
                  }
                  toast.dismiss();
                });
            }}
            style={{ background: "red", color: "white", padding: "5px 10px", cursor: "pointer" }}
          >
            Yes
          </button>
          <button onClick={() => toast.dismiss()} style={{ background: "gray", color: "white", padding: "5px 10px", cursor: "pointer" }}>
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };


  const paginatedTrades = sortedTrades.slice((currentPage - 1) * tradesPerPage, currentPage * tradesPerPage);

  if (loading) return <p>Loading...</p>;
  if (!trades.length) return <p>No trades found</p>;
  if (loading || tradeLoading) return <p className="text-center">Loading dashboard...</p>;
  if (error || tradeError) return <p className="text-red-500 text-center">Error loading data</p>; 

  return (
    <div className="flex min-h-screen md:mt-20 mt-2">
      <main className="flex-1 p-6 md:w-full w-88">
        <h1 className="text-3xl font-bold mb-4 tracking-wider">Welcome, {user?.username}</h1>
        <p className="text-lg">Total PnL: <span className={totalPnL >= 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>${totalPnL}</span></p>

        {/* Calendar with PnL Highlights */}
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-4">Trade Calendar</h1>

          {/* Monthly PnL */}
          <div className="mb-4 p-4 bg-white shadow rounded">
                <h3 className="text-lg font-semibold">Monthly PnL</h3>
                <DatePicker
                    selected={selectedMonth}
                    onChange={date => setSelectedMonth(date)}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    className="border p-2 rounded"
                />
                <p className="mt-2">PnL: <span className={`font-bold ${monthlyPnL > 0 ? "text-green-500" : "text-red-500"}`}>
                  ₹{monthlyPnL}</span> </p>
            </div>

            {/* Streaks */}
            {/* <div className="p-4 bg-white shadow rounded mb-4">
                <h3 className="text-lg font-semibold">Winning & Losing Streaks</h3>
                <p>Longest Winning Streak: {longestWin} days</p>
                <p>Longest Losing Streak: {longestLoss} days</p>
            </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 shadow-md rounded-lg">
              <Calendar
                onClickDay={handleDateClick}
                tileContent={({ date }) => {
                  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                    .toISOString()
                    .split("T")[0];
                
                  const pnl = tradePnLMap[localDate] || 0;
                  
                  if (pnl !== 0) {
                    return (
                      <div
                        className={`relative w-6 h-6 flex items-center justify-center rounded-full ${
                          pnl > 0 ? "bg-green-500 text-black" : "bg-red-500 text-white"
                        }`}
                        style={{ transform: `scale(${Math.min(1, Math.abs(pnl) / 1000)})` }}
                      />
                    );
                  }
                  return null;
                }}
                
              />
            </div>

            {/* Selected Date Trade Details */}
            {selectedDate && (
              <div className="bg-white p-4 shadow-md rounded-lg">
                <h2 className="text-xl font-bold mb-2">Trades on {selectedDate}</h2>
                {filteredTrades.length > 0 ? (
                  <ul>
                    {filteredTrades.map((trade) => (
                      <li key={trade._id} className="border-b py-2">
                        <span className="font-semibold">{trade.ticker}:</span> <span className={`font-bold p-2 rounded-xl ${
                          trade.pnl > 0 ? "text-green-500" : "text-red-500 "
                        }`}>₹{trade.pnl}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No trades on this day.</p>
                )}
              </div>
            )}
          </div>
        </div>  
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-2">Trade Performance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processedTradeData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, "auto"]} />
                <Tooltip />
                <Bar
                  dataKey="PNL"
                  barSize={80}
                  shape={(props) => {
                    const { x, width, payload, y } = props;
                    const pnl = Math.abs(payload.PNL); 
                    const maxPNL = Math.max(...processedTradeData.map((d) => Math.abs(d.PNL)));
                    const chartHeight = 250; 
                    const barHeight = (pnl / maxPNL) * chartHeight; 
                    const xAxisY = 265;

                    return (
                      <rect
                        x={x}
                        y={xAxisY - barHeight} 
                        width={width}
                        height={barHeight} 
                        fill={payload.PNL < 0 ? "#e74c3c" : "#2ecc71"}
                      />
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-2">Win/Loss Ratio</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trade Table */}
        <div className="mt-10 bg-white p-4 shadow-md rounded-lg">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-xl font-bold mb-4">Trade History</h2>
            <button 
              onClick={exportToExcel} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mb-4"
            > 
              Export to Excel
            </button>
          </div>

          {/* Responsive Scrollable Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  {[
                    'ticker', 'type', 'entry Price', 'exit Price', 'pnl', 'date', 
                    'Entry Time', 'Strategy', 'Reason', 'market Condition'
                  ].map(col => (
                    <th 
                      key={col} 
                      className="border p-2 cursor-pointer text-xs md:text-sm"
                      onClick={() => sortTrades(col)}
                    >
                      {col.toUpperCase()} {sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                    </th>
                  ))}
                  <th className="border p-2 text-xs md:text-sm">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTrades.map((trade, index) => (
                  <tr key={index} className="border hover:bg-gray-100">
                    <td className="border p-2">{trade.ticker}</td>
                    <td className="border p-2">{trade.type}</td>
                    <td className="border p-2">${trade.entryPrice}</td>
                    <td className="border p-2">${trade.exitPrice}</td>
                    <td className={`border p-2 ${trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>
                      ${trade.pnl}
                    </td>
                    <td className="border p-2">{new Date(trade.date).toLocaleDateString()}</td>
                    <td className="border p-2">{trade.entryTime}</td>
                    <td className="border p-2">{trade.strategy}</td>
                    <td className="border p-2">{trade.reason}</td>
                    <td className="border p-2">{trade.marketCondition}</td>
                    <td className="border p-2 text-center">
                      <button 
                        onClick={() => handleDeleteTrade(trade._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-between mt-4 gap-2">
            <button 
              disabled={currentPage === 1} 
              onClick={() => setCurrentPage(currentPage - 1)} 
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <p className="text-sm md:text-base">Page {currentPage} of {Math.ceil(trades.length / tradesPerPage)}</p>
            <button 
              disabled={currentPage === Math.ceil(trades.length / tradesPerPage)} 
              onClick={() => setCurrentPage(currentPage + 1)} 
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </div>  
  );
});

Dashboard.displayName = "Dashboard";
export default Dashboard;