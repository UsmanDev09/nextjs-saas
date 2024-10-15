import { createAsyncThunk } from '@reduxjs/toolkit';

import onboardingService from '@/services/onboarding.service';
import { handleThunkApiError } from '@/utils';

export const getOnboardingData = createAsyncThunk(
  'onboarding/getOnboardingData',
  handleThunkApiError(onboardingService.getOnboardingData),
);

export const updateOnboardingData = createAsyncThunk(
  'onboarding/updateOnboardingData',
  handleThunkApiError(onboardingService.updateOnboarding),
);
