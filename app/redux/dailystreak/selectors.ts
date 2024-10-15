import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

export const DailyStreakStateSelector = ({ dailyStreak }: RootState) => dailyStreak;

export const DailyStreakSelector = createSelector(
  DailyStreakStateSelector,
  ({ status, message, data }) => ({
    status,
    message,
    data,
  }),
);
