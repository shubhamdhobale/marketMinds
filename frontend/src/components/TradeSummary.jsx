import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent } from "../components/ui/card.tsx";
import { FaChartLine, FaBalanceScale, FaClock, FaDollarSign, FaList } from "react-icons/fa";
import { useEffect } from "react";
import { fetchUserProfile, fetchUserTrades } from "../redux/authSlice.js";
import SideBar from "./SideBar.jsx";

const TradeSummary = () => {
  const dispatch = useDispatch();
  const { user, trades = []} = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (!user) dispatch(fetchUserProfile());
    if (trades.length === 0) dispatch(fetchUserTrades());
  }, [dispatch, user, trades]);

  // Calculate metrics
  const totalTrades = trades.length;
  const totalProfitLoss = trades.reduce((acc, trade) => acc + trade.pnl, 0);
  const winningTrades = trades.filter((trade) => trade.pnl > 0).length;
  const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100).toFixed(2) : 0;
  const avgProfit = trades.filter(t => t.pnl > 0).reduce((acc, t) => acc + t.pnl, 0) / (winningTrades || 1);
  const avgLoss = trades.filter(t => t.pnl < 0).reduce((acc, t) => acc + Math.abs(t.pnl), 0) / (totalTrades - winningTrades || 1);
  const riskToRewardRatio = avgLoss > 0 ? (avgProfit / avgLoss).toFixed(2) : "-";
  const tradesWithHoldingTime = trades.map(trade => ({
    ...trade, 
    holdingTime: (trade.exitTime - trade.entryTime) / (1000 * 60 * 60) 
}));
  const avgHoldingTime = (tradesWithHoldingTime.reduce((acc, trade) => acc + trade.holdingTime, 0) / totalTrades || 0).toFixed(2);

  return (
    <div className="flex min-h-screen">   
    <SideBar/>
    <div>
      <h1 className="text-4xl mt-28 text-center font-extrabold">Trade Summary</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 mt-10">
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
