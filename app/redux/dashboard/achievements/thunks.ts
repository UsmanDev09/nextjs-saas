import { createAsyncThunk } from '@reduxjs/toolkit';

import { dashboardService } from '@/services';
import { handleThunkApiError } from '@/utils';

export const getAllAchievements = createAsyncThunk(
  'getAllAchievements',
  handleThunkApiError(dashboardService.getAllAchievements),
);

export const claimReward = createAsyncThunk(
  'claimReward',
  handleThunkApiError(dashboardService.claimReward),
);

export const getCurrentAchievements = createAsyncThunk(
  'getCurrentAchievements',
  handleThunkApiError(dashboardService.currentAchievement),
);
