import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

export const dashboardStateSelector = ({ dashboard }: RootState) => dashboard;

export const GlobalUsersSelector = createSelector(
  dashboardStateSelector,
  ({ globalUsers, hasMore, isLoading }) => ({
    globalUsers,
    hasMore,
    isLoading,
  }),
);
