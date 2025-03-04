import mongoose from "mongoose";

const tradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  ticker: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["buy", "sell"], 
    required: true,
  },
  entryPrice: {
    type: Number,
    required: true,
  },
  exitPrice: {
    type: Number,
    required: true,
  },
  stopLoss: {
    type: Number,
    required: true,
  },
  pnl: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  entryTime: {
    type: String, 
    required: true, 
  },
  date: {
    type: Date,
    default: Date.now,
  },
  strategy: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
  marketCondition: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;
