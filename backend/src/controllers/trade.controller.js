import asyncHandler from "express-async-handler";
import Trade from "../models/trade.model.js";

export const addNewTrade = asyncHandler(async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Authenticated User:", req.user);

    const { ticker, type, entryTime, entryPrice, exitPrice, stopLoss, quantity, pnl, date, strategy, reason, marketCondition } = req.body;

    if (!ticker || !entryPrice || !exitPrice || !quantity || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const trade = new Trade({
      user: req.user._id,  // Ensure user is correctly set
      ticker,
      type,
      entryTime,
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
