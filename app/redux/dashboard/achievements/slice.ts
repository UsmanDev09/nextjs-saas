import { createSlice } from '@reduxjs/toolkit';

import { getAllAchievements, getCurrentAchievements } from './thunks';

// import type IUserAchievementsState from './types';

const initialState: any = {
  achievements: {
    completedAchievementsCount: 0,
    data: [],
  },
  currentAchievements: {
    completedAchievementsCount: 0,
    data: [],
  },
};

export const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    resetState: () => initialState,
    setAchievements(state, action) {
      state.achievements = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllAchievements.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      } else {
        state.achievements = payload;
      }
    });
    builder.addCase(getCurrentAchievements.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      } else {
        state.currentAchievements = payload;
      }
    });
  },
});

export const { resetState } = achievementsSlice.actions;

export default achievementsSlice.reducer;
