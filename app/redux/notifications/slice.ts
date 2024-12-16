import { createSlice } from '@reduxjs/toolkit';

import type { INotificationsState } from './types';

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
});

export const { resetState, setNotifications } = notificationsSlice.actions;

export default notificationsSlice.reducer;
