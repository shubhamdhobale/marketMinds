import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { addNewTrade, deleteTrade, equityCurve, getUserTrades } from '../controllers/trade.controller.js';

const router = express.Router();

router.post('/newtrade' , protect , addNewTrade);
router.get("/mytrades", protect, getUserTrades);
router.delete("/:id", protect, deleteTrade);
router.get('/equity-curve', protect, equityCurve);

export default router;