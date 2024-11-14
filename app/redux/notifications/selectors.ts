import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/redux/store';

export const NotificationsStateSelector = ({ notifications }: RootState) => notifications;

export const NotificationsSelector = createSelector(
  NotificationsStateSelector,
  ({ notifications }) => ({
    notifications,
  }),
);
