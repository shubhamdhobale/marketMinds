import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VITE_API_BASE_URL } from "../components";

// 📌 Fetch Monthly PnL
export const fetchMonthlyPnL = createAsyncThunk(
    "pnl/fetchMonthly",
    async ({ userId, year, month }, { getState }) => {
      const token = getState().auth.token; // Get token from Redux state
  
      if (!token) {
        throw new Error("Token is missing");
      }
  
      const response = await axios.get(
        `${VITE_API_BASE_URL}trade/pnl/monthly/${userId}/${year}/${month}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data.pnl;
    }
  );

// 📌 Fetch Longest Streaks
// export const fetchStreaks = createAsyncThunk(
//     "pnl/fetchStreaks",
//     async (userId) => {
//         const response = await axios.get(`${VITE_API_BASE_URL}trade/streak/${userId}`,
          
//         );
//         return response.data;
//     }
// );

const pnlSlice = createSlice({
    name: "pnl",
    initialState: { monthlyPnL: 0, longestWin: 0, longestLoss: 0, status: "idle" , error: null,},
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMonthlyPnL.fulfilled, (state, action) => {
                state.monthlyPnL = action.payload;
            })
            // .addCase(fetchStreaks.fulfilled, (state, action) => {
            //     state.longestWin = action.payload.longestWin;
            //     state.longestLoss = action.payload.longestLoss;
            // });
    }
});

export default pnlSlice.reducer;
