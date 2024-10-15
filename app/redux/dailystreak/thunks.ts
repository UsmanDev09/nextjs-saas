import { createAsyncThunk } from '@reduxjs/toolkit';

import dashboardService from '@/services/dashboard/dashboard.service';
import { handleThunkApiError } from '@/utils';

export const getDailyStreak = createAsyncThunk(
  'getDailyStreak',
  handleThunkApiError(dashboardService.getRewardDetails),
);

export const claimDailyStreak = createAsyncThunk(
  'claimDailyStreak',
  handleThunkApiError(dashboardService.claimDailyStreak),
);

// export const updateTimeInDailyStreak = createAsyncThunk(
//   'updateTimeInDailyStreak',
//   handleThunkApiError(dashboardService.claimDailyStreak),
// );
