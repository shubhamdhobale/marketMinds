import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, fetchUserTrades} from "../redux/authSlice.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import SideBar from "./SideBar.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { deleteTrade } from "../redux/tradeSlice.js";
import {toast} from "react-toastify";

const TradeHistory = () => {
    const dispatch = useDispatch();
    const { user, trades = [], loading, tradeLoading, error, tradeError } = useSelector((state) => state.auth);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
      const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };
  
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

  const paginatedTrades = sortedTrades.slice((currentPage - 1) * tradesPerPage, currentPage * tradesPerPage);

  const handleDeleteTrade = (tradeId) => {
      toast.warn(
        "Are you sure you want to delete this trade?",
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          closeButton: true,
          onClose: () => {
            dispatch(deleteTrade(tradeId))
              .then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                  toast.success("Trade deleted successfully!");
                } else {
                  toast.error("Failed to delete trade. Try again.");
                }
              });
          },
        }
      );
    };

  if (loading || tradeLoading) return <p className="text-center">Loading dashboard...</p>;
  if (error || tradeError) return <p className="text-red-500 text-center">Error loading data</p>; 


  
  return (
    <div className="flex min-h-screen md:flex-row flex-col px-6 md:px-0">

      <button
        className="md:hidden p-2 bg-gray-800 text-white mt-24 rounded-lg px-4 cursor-pointer py-2 ml-6 md:ml-0 w-1/2"
        onClick={toggleSidebar}> 
        Menu
      </button>

      <div className="md:block hidden min-h-screen">
        <SideBar/>  
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

      {/* Trade Table */}
      <div className="mt-10 bg-white px-4 py-4 shadow-md rounded-lg md:mt-32 md:ml-4 md:mb-4">
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
                onClick={() => handleDeleteTrade(trade.id)} 
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
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
    </div>
  )
}

export default TradeHistory