import asyncHandler from "express-async-handler";
import Trade from "../models/trade.model.js";
import mongoose from "mongoose";

export const addNewTrade = asyncHandler(async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Authenticated User:", req.user);

    const { ticker, type, entryTime, exitTime , entryPrice, exitPrice, stopLoss, quantity, pnl, date, strategy, reason, marketCondition } = req.body;

    if (!ticker || !entryPrice || !exitPrice || !quantity || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const trade = new Trade({
      user: req.user._id,  
      ticker,
      type,
      entryTime,
      exitTime,
      entryPrice,
      exitPrice,
      stopLoss,
      quantity,
      pnl,
      date,
      strategy,
      reason,
      marketCondition,
    });

    const savedTrade = await trade.save();
    console.log("Trade Saved Successfully:", savedTrade);
    
    res.status(201).json(savedTrade);
  } catch (error) {
    console.error("Trade Entry Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export const getUserTrades = asyncHandler(async (req, res) => {
  try {
    // console.log("Fetching trades for user:", req.user._id);
    const trades = await Trade.find({ user: req.user._id }).sort({ date: -1 }); // Sort by date (latest first)
    
    if (!trades || trades.length === 0) {
      return res.status(404).json({ message: "No trades found" });
    }

    res.status(200).json(trades);
  } catch (error) {
    console.error("Error fetching trades:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

export const deleteTrade = asyncHandler(async (req, res) => {
  console.log("🛠 Received DELETE request for Trade ID:", req.params.id);
  console.log("🛠 Authenticated User ID:", req.user?.id);

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized: No user found" });
  }

  const tradeId = req.params.id;
  const userId = req.user.id;

  try {
    const trade = await Trade.findOne({ _id: tradeId, user: userId });
    if (!trade) {
      return res.status(404).json({ message: "Trade not found or unauthorized access" });
    }

    await Trade.findByIdAndDelete(tradeId);
    res.json({ message: "Trade deleted successfully" });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export const getMonthlyPNL = asyncHandler(async (req, res) => {
  try {
    const { year, month } = req.params;
    const userId = req.user._id

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    
    const numericYear = parseInt(year, 10);
    const numericMonth = parseInt(month, 10);

    if (isNaN(numericYear) || isNaN(numericMonth) || numericMonth < 1 || numericMonth > 12) {
      return res.status(400).json({ error: "Invalid year or month" });
    }

    const startDate = new Date(Date.UTC(numericYear, numericMonth - 1, 1, 0, 0, 0)); 
    const endDate = new Date(Date.UTC(numericYear, numericMonth, 0, 23, 59, 59, 999)); 

    // console.log(`Fetching PnL for User: ${userId}, Year: ${numericYear}, Month: ${numericMonth}`);
    // console.log(`Start Date: ${startDate.toISOString()}, End Date: ${endDate.toISOString()}`);

    const trades = await Trade.find({
      user: req.user._id,
      date: { $gte: startDate, $lte: endDate }
    });
    
    // console.log(`Fetched Trades Count: ${trades.length}`);
    // console.log(`Trades Data:`, trades);

    const pnl = trades.reduce((sum, trade) => sum + (trade.pnl || 0), 0);
    // console.log(`Total PnL: ${pnl}`);

    res.status(200).json({ pnl });
  } catch (error) {
    console.error("Error fetching monthly PnL:", error);
    res.status(500).json({ error: error.message });
  }
});

// export const getLongestWinAndLossStreak = asyncHandler(async (req , res) => {
//     try {
//       const { userId } = req.params;
//       const trades = await Trade.find({ userId }).sort({ date: 1 });

//       let longestWin = 0, longestLoss = 0, currentWin = 0, currentLoss = 0;

//       trades.forEach(trade => {
//           if (trade.pnl > 0) {
//               currentWin++;
//               currentLoss = 0;
//           } else if (trade.pnl < 0) {
//               currentLoss++;
//               currentWin = 0;
//           } else {
//               currentWin = currentLoss = 0;
//           }

//           longestWin = Math.max(longestWin, currentWin);
//           longestLoss = Math.max(longestLoss, currentLoss);
//       });

//       res.json({ longestWin, longestLoss });
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// })