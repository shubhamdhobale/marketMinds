import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTrade, fetchUserProfile, fetchUserTrades } from "../redux/authSlice.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell ,LineChart, Line, CartesianGrid } from 'recharts';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "react-datepicker/dist/react-datepicker.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, trades = [], loading, tradeLoading, error, tradeError } = useSelector((state) => state.auth);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [data, setData] = useState([]);
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
  
          const formattedData = response.data.map((trade) => ({
            date: trade.date, 
            balance: trade.cumulativePnL, 
          }));
  
          setData(formattedData);
  
          const lastBalance = formattedData[formattedData.length - 1].balance;
          setLineColor(lastBalance < 0 ? "#FF0000" : "#4CAF50"); 
  
        } catch (error) {
          console.error("Error fetching equity curve data:", error);
          toast.error("Failed to load equity curve. Please login again.");
        }
      };
  
      fetchData();
    }, []);

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
    const tradeDate = new Date(trade.date).toISOString().split("T")[0]; // Format: YYYY-MM-DD
    acc[tradeDate] = (acc[tradeDate] || 0) + trade.pnl;
    return acc;
  }, {});

  // Handle date click to filter trades
  const handleDateClick = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setFilteredTrades(trades.filter(trade => trade.date.startsWith(formattedDate)));
  };

  // const selectedDatePnL = filteredTrades.reduce((acc, trade) => acc + trade.pnl, 0);

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
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleDeleteTrade = (tradeId) => {
      if (window.confirm("Are you sure you want to delete this trade?")) {
        dispatch(deleteTrade(tradeId));
      }
    };

  const paginatedTrades = sortedTrades.slice((currentPage - 1) * tradesPerPage, currentPage * tradesPerPage);

  if (loading || tradeLoading) return <p className="text-center">Loading dashboard...</p>;
  if (error || tradeError) return <p className="text-red-500 text-center">Error loading data</p>; 

  return (
    <div className="flex min-h-screen mt-24">
      <main className="flex-1 p-6 ">
        <h1 className="text-3xl font-bold mb-4 tracking-wider">Welcome, {user?.username}</h1>
        <p className="text-lg">Total PnL: <span className={totalPnL >= 0 ? "text-green-500 font-bold" : "text-red-500 font-bold"}>${totalPnL}</span></p>

        <div>
          <div className="w-full p-4 bg-white rounded-md shadow-md mx-4 my-4">
                  <h2 className="text-lg font-semibold mb-3">Cumulative Profit/Loss</h2>
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

        <div className="mt-4">
        <h1 className="text-3xl font-bold mb-4">Trade Calendar</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Calendar with PnL Highlights */}
        <div className="bg-white p-4 shadow-md rounded-lg ">
          <Calendar
            onClickDay={handleDateClick}
            tileContent={({ date }) => {
              const dateStr = date.toISOString().split("T")[0];
              const pnl = tradePnLMap[dateStr] || 0;
              if (pnl !== 0) {
                return (
                  <div
                    className={`relative w-6 h-6 flex items-center justify-center rounded-full ${
                      pnl > 0 ? " bg-green-500 text-white" : "bg-red-500 text-white"
                    }`}
                    style={{ transform: `scale(${Math.min(1, Math.abs(pnl) / 1000)})` }}
                  >
                    {/* ₹{pnl} */}
                  </div>
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
              <BarChart data={tradeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="PNL" fill="#3498db" />
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
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Trade History</h2>
            <button onClick={exportToExcel} className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mb-4"> 
              Export to Excel
            </button>
          </div>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                {['ticker', 'type', 'entry Price', 'exit Price', 'pnl', 'date' , 'Entry Time' , 'Strategy' , 'Reason' , 'market Condition'].map(col => (
                  <th key={col} className="border p-2 cursor-pointer " onClick={() => sortTrades(col)}>
                    {col.toUpperCase()} {sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedTrades.map((trade, index) => (
                <tr key={index} className="border hover:bg-gray-100">
                  <td className="border p-2">{trade.ticker}</td>
                  <td className="border p-2">{trade.type}</td>
                  <td className="border p-2">${trade.entryPrice}</td>
                  <td className="border p-2">${trade.exitPrice}</td>
                  <td className={`border p-2 ${trade.pnl >= 0 ? "text-green-500" : "text-red-500"}`}>${trade.pnl}</td>
                  <td className="border p-2">{new Date(trade.date).toLocaleDateString()}</td>
                  <td className="border p-2">{trade.entryTime}</td>
                  <td className="border p-2">{trade.strategy}</td>
                  <td className="border p-2">{trade.reason}</td>
                  <td className="border p-2">{trade.marketCondition}</td>
                  <td className="border p-2 text-center">
                  <button onClick={() => handleDeleteTrade(trade.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700">
                    Delete
                  </button>
                </td> 
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Previous</button>
            <p>Page {currentPage} of {Math.ceil(trades.length / tradesPerPage)}</p>
            <button disabled={currentPage === Math.ceil(trades.length / tradesPerPage)} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50">Next</button>
          </div>
        </div>
        
      </main>
    </div>  
  );
};

export default Dashboard;