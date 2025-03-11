import asyncHandler from "express-async-handler";
import Trade from "../models/trade.model.js";

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
    console.log("Fetching trades for user:", req.user._id);
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

export const deleteTrade = asyncHandler(async (req , res) => {
  const tradeId = req.params.id;
  const userId = req.user.id; // Ensure user ID is extracted properly

  try {
    const trade = await Trade.findOne({ _id: tradeId, user: userId });
    if (!trade) {
      return res.status(404).json({ message: "Trade not found" });
    }

    await Trade.findByIdAndDelete(tradeId);
    res.json({ message: "Trade deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
})

export const equityCurve = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const trades = await Trade.find({ user: userId }).sort({ date: 1 }); 

    if (!trades.length) {
      console.log("No trades found for user:", userId);
      return res.status(200).json([]); 
    }

    let cumulativePnL = 0;
    const formattedData = trades.map((trade) => {
      cumulativePnL += trade.pnl;
      return {
        date: trade.date.toISOString().split("T")[0],
        cumulativePnL,
      };
    });

    // console.log("🔹 Equity Curve Response:", formattedData);
    res.status(200).json(formattedData);
  } catch (error) {
    console.error("Error fetching equity curve:", error);
    res.status(500).json({ message: "Server error" });
  }
});