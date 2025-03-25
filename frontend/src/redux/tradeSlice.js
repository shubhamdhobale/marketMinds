import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteTrade = createAsyncThunk(
  "trades/deleteTrade",
  async (tradeId, { rejectWithValue, getState }) => {
    try {
      const { VITE_API_BASE_URL } = import.meta.env;

      // Fetch token from Redux store
      const token = getState().auth?.user?.token;

      if (!token) {
        console.error("🚨 No token found! User is not authenticated.");
        return rejectWithValue("Unauthorized: No token provided");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      };

      console.log(`🛠 Sending DELETE request to: ${VITE_API_BASE_URL}/api/trades/${tradeId}`);

      await axios.delete(`${VITE_API_BASE_URL}/api/trades/${tradeId}`, config);
      return tradeId; // Return the tradeId on successful deletion
    } catch (error) {
      console.error("❌ Delete request failed:", error);
      return rejectWithValue(error.response?.data || "Error deleting trade");
    }
  }
);

const tradeSlice = createSlice({
  name: "trades",
  initialState: { trades: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteTrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTrade.fulfilled, (state, action) => {
        state.trades = state.trades.filter((trade) => trade._id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default tradeSlice.reducer;
