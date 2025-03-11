import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, fetchUserTrades , deleteTrade} from "../redux/authSlice.js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import SideBar from "./SideBar.jsx";

const TradeHistory = () => {
    const dispatch = useDispatch();
    const { user, trades = [], loading, tradeLoading, error, tradeError } = useSelector((state) => state.auth);
  
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
    if (window.confirm("Are you sure you want to delete this trade?")) {
      dispatch(deleteTrade(tradeId));
    }
  };

  if (loading || tradeLoading) return <p className="text-center">Loading dashboard...</p>;
  if (error || tradeError) return <p className="text-red-500 text-center">Error loading data</p>; 

  return (
    <div className="flex min-h-screen">
      <SideBar/>
      {/* Trade Table */}
      <div className="mt-32 bg-white w-5xl mx-auto mb-10 p-4 shadow-md rounded-lg">
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
    </div>
  )
}

export default TradeHistory