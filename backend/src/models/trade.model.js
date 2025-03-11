import mongoose from "mongoose";

const tradeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  ticker: { type: String, required: true },
  type: { type: String, required: true },
  entryTime: { type: String },
  exitTime: { type: String },
  entryPrice: { type: Number, required: true },
  exitPrice: { type: Number, required: true },
  stopLoss: { type: Number },
  quantity: { type: Number, required: true },
  pnl: { type: Number },
  date: { type: Date, required: true },
  strategy: { type: String },
  reason: { type: String },
  marketCondition: { type: String, default: "Bullish" }
}, { timestamps: true });

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;
