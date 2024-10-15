import { createSlice } from '@reduxjs/toolkit';

import { claimDailyStreak, getDailyStreak } from './thunks';

import type IDailyStreak from './types';

const initialState: IDailyStreak = {
  status: false,
  message: '',
  data: [],
  time: '',
};

export const DailyStreakSlice = createSlice({
  name: 'dailystreak',
  initialState,
  reducers: {
    resetState: () => initialState,
    setDailyStreak: (state, action) => {},
    setDailyStreakTime: (state, action) => {
      state.time = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDailyStreak.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      } else {
        state.status = payload.status;
        state.message = payload.message;
        state.data = payload.data;
      }
    });
    builder.addCase(claimDailyStreak.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      } else {
        state.status = payload.status;
        state.message = payload.message;
        state.data = payload.data;
        state.time = new Date().toString();
      }
    });
  },
});

export const { resetState, setDailyStreak, setDailyStreakTime } = DailyStreakSlice.actions;

export default DailyStreakSlice.reducer;
