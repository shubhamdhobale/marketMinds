import { useState } from "react";
import * as XLSX from "xlsx";

const TradeHistory = ({ trades }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const tradesPerPage = 10;
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting function
  const sortTrades = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    trades.sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Paginate trades
  const indexOfLastTrade = currentPage * tradesPerPage;
  const indexOfFirstTrade = indexOfLastTrade - tradesPerPage;
  const paginatedTrades = trades.slice(indexOfFirstTrade, indexOfLastTrade);

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(trades);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trade History");
    XLSX.writeFile(workbook, "TradeHistory.xlsx");
  };

  return (
    <div className="mt-10 bg-white p-4 shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-4">Trade History</h2>
        <button
          onClick={exportToExcel}
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer mb-4"
        >
          Export to Excel
        </button>
      </div>

      {/* Trade Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            {[
              "ticker",
              "type",
              "entryPrice",
              "exitPrice",
              "pnl",
              "date",
              "entryTime",
              "strategy",
              "reason",
              "marketCondition",
            ].map((col) => (
              <th
                key={col}
                className="border p-2 cursor-pointer"
                onClick={() => sortTrades(col)}
              >
                {col.toUpperCase()}{" "}
                {sortConfig.key === col ? (sortConfig.direction === "asc" ? "▲" : "▼") : ""}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedTrades.length > 0 ? (
            paginatedTrades.map((trade, index) => (
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4">
                No trades found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <p>
          Page {currentPage} of {Math.ceil(trades.length / tradesPerPage)}
        </p>
        <button
          disabled={currentPage === Math.ceil(trades.length / tradesPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TradeHistory;
