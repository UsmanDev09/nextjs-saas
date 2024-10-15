import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

export const friendsStateSelector = ({ friends }: RootState) => friends;

export const friendsSelector = createSelector(
  friendsStateSelector,
  ({ friends, hasMore, isLoading }) => ({
    friends,
    hasMore,
    isLoading,
  }),
);
