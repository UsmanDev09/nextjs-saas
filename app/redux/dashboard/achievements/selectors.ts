import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

export const AchievementsStateSelector = ({ achievements }: RootState) => achievements;

export const AchievementsSelector = createSelector(
  AchievementsStateSelector,
  ({ achievements }) => ({
    achievements,
  }),
);

export const CurrentAchievementsSelector = createSelector(
  AchievementsStateSelector,
  ({ currentAchievements }) => ({
    currentAchievements,
  }),
);
