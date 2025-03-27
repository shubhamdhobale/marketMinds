import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { addNewTrade, deleteTrade,   getMonthlyPNL, getUserTrades } from '../controllers/trade.controller.js';

const router = express.Router();

router.post('/newtrade' , protect , addNewTrade);
router.get("/mytrades", protect, getUserTrades);
router.delete("/:id", protect, deleteTrade);
router.get("/pnl/monthly/:id/:year/:month", protect, getMonthlyPNL);
// router.get('/streak/:userId' , protect , getLongestWinAndLossStreak);

export default router;