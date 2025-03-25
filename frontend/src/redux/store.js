import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import tradeReducer from "./tradeSlice.js"

const store = configureStore({
  reducer: {
    auth: authReducer,
    trade: tradeReducer,
  },
});

export default store;