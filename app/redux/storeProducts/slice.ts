import { createSlice } from '@reduxjs/toolkit';

import { getLuckyRewards, getRewards, getStoreProduct } from './thunks';

import type IStoreState from './types';

// const initialState: IStoreState = {
//   storedata: [],
//   dailyRewards: [],
// };

const initialState: IStoreState = {
  storedata: {
    category: [],
    elite: {
      id: '',
      name: '',
      currency: '',
      description: '',
      interval: '',
      price: '',
    },
    isElite: 0,
    subscrptionId: '',
    sesssional: '',
  },
  dailyRewards: {
    dailyRewardsList: [],
    streakSaver: 0,
  },

  luckyRewards: {},
};
export const storeProductSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getStoreProduct.fulfilled, (state, { payload }) => {
      state.storedata = payload;
    });
    builder.addCase(getRewards.fulfilled, (state, { payload }) => {
      state.dailyRewards = payload;
    });

    builder.addCase(getLuckyRewards.fulfilled, (state, { payload }) => {
      state.luckyRewards = payload;
    });
  },
});

export const { resetState } = storeProductSlice.actions;
export default storeProductSlice.reducer;
