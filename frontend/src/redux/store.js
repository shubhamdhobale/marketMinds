import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tradeReducer from "./tradeSlice.js"
import pnlReducer from "./pnlSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    trade: tradeReducer,
    pnl: pnlReducer,
  },
});

export default store;