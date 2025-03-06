import express from 'express';
import { protect } from '../middleware/auth.middleware.js';
import { addNewTrade, deleteTrade, getUserTrades } from '../controllers/trade.controller.js';

const router = express.Router();

router.post('/newtrade' , protect , addNewTrade);
router.get("/mytrades", protect, getUserTrades);
// router.delete("/:id", protect, deleteTrade);
export default router;