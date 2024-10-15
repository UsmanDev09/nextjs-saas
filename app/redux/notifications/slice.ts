import { createSlice } from '@reduxjs/toolkit';

import { getNotifications } from './thunks';

import type INotificationsState from './types';

const initialState: INotificationsState = {
  notifications: {
    todays: {
      total: 0,
      data: [],
    },
    others: {
      total: 0,
      currentPage: 0,
      data: [],
      totalPages: 0,
    },
  },
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    resetState: () => initialState,
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      } else {
        state.notifications = payload;
      }
    });
  },
});

export const { resetState, setNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
