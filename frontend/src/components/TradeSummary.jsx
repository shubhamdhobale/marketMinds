import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "../components/ui/card.tsx";
import { FaChartLine, FaBalanceScale, FaClock, FaDollarSign, FaList } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchUserProfile, fetchUserTrades } from "../redux/authSlice.js";
import SideBar from "./SideBar.jsx";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const TradeSummary = () => {
  const dispatch = useDispatch();
  const { user, trades = []} = useSelector((state) => state.auth);
   const [sidebarOpen, setSidebarOpen] = useState(false);
      
    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };
    

    useEffect(() => {
      if (!user) dispatch(fetchUserProfile());
    } , [dispatch, user,])
  
  useEffect(() => {
    if (trades.length === 0) dispatch(fetchUserTrades());
  }, [dispatch , trades.length]);

  // Calculate metrics
  const totalTrades = trades?.length || 0;
  const totalProfitLoss = trades.reduce((acc, trade) => acc + trade.pnl, 0);
  const winningTrades = trades.filter((trade) => trade.pnl > 0).length;
  // const lossingTrades = trades.filter((trade) => trade.pnl < 0).length;
  const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(2) : 0;
  const avgProfit = winningTrades > 0 
  ? trades.filter(t => t.pnl > 0).reduce((acc, t) => acc + t.pnl, 0) / winningTrades
  : 0;
  const avgLoss = (totalTrades - winningTrades) > 0 
    ? trades.filter(t => t.pnl < 0).reduce((acc, t) => acc + Math.abs(t.pnl), 0) / (totalTrades - winningTrades)
    : 0;
  const riskToRewardRatio = avgLoss > 0 ? (avgProfit / avgLoss).toFixed(2) : "-";

  const tradesWithHoldingTime = trades.map(trade => {
    if (!trade.entryTime || !trade.exitTime || !trade.date) return { ...trade, holdingTime: 0 };
  
    try {
      const tradeDate = new Date(trade.date.split("T")[0]); 
  
      const [entryHour, entryMinute] = trade.entryTime.split(":").map(Number);
      const [exitHour, exitMinute] = trade.exitTime.split(":").map(Number);
  
      const entryDateTime = new Date(tradeDate);
      entryDateTime.setHours(entryHour, entryMinute, 0);
  
      const exitDateTime = new Date(tradeDate);
      exitDateTime.setHours(exitHour, exitMinute, 0);
  
      if (exitDateTime < entryDateTime) {
        exitDateTime.setDate(exitDateTime.getDate() + 1); 
      }
  
      return {
        ...trade,
        holdingTime: (exitDateTime - entryDateTime) / (1000 * 60 * 60) 
      };
  
    } catch (error) {
      console.error("Error parsing trade times:", error);
      return { ...trade, holdingTime: 0 };
    }
  });
  
  // Sum up holding times
  const totalHoldingTime = tradesWithHoldingTime.reduce((acc, trade) => acc + (trade.holdingTime || 0), 0);
  
  // Compute average
  const avgHoldingTime = tradesWithHoldingTime.length > 0
    ? (totalHoldingTime / tradesWithHoldingTime.length).toFixed(2)
    : "0";
  
  console.log(tradesWithHoldingTime);
  console.log("Total Holding Time:", totalHoldingTime);
  console.log("Average Holding Time:", avgHoldingTime);
  

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


    <div>
      <h1 className="text-4xl md:mt-28 mt-12 text-center font-extrabold">Trade Summary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mt-4">
        <Card>
          <CardContent className="flex items-center p-4">
            <FaList className="text-blue-500 text-2xl mr-4"/>
            <div>
              <p className="text-gray-500">Total Trades</p>
              <h2 className="text-xl font-semibold">{totalTrades}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <FaDollarSign className="text-green-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-500">Total P/L</p>
              <h2 className={`text-xl font-semibold ${totalProfitLoss >= 0 ? "text-green-600" : "text-red-600"}`}>
                {totalProfitLoss.toFixed(2)}
              </h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <FaChartLine className="text-purple-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-500">Win Rate</p>
              <h2 className="text-xl font-semibold">{winRate}%</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <FaBalanceScale className="text-orange-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-500">Risk-Reward Ratio</p>
              <h2 className="text-xl font-semibold">{riskToRewardRatio}</h2>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center p-4">
            <FaClock className="text-indigo-500 text-2xl mr-4" />
            <div>
              <p className="text-gray-500">Avg Holding Time</p>
              <h2 className="text-xl font-semibold">{avgHoldingTime} min</h2>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default TradeSummary;
