import { createSlice } from '@reduxjs/toolkit';

import { OnboardingStepEnum, stepperMap } from '@/constants';

import { getOnboardingData, updateOnboardingData } from './thunks';

import type IOnboardingState from './types';

const initialState: IOnboardingState = {
  currentStep: stepperMap[OnboardingStepEnum.FirstStep],
  isInitialLoading: true,
  onboardingData: undefined,
};

export const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    resetState(state) {
      state.currentStep = stepperMap[OnboardingStepEnum.FirstStep];
      state.isInitialLoading = true;
      state.onboardingData = undefined;
    },
    nextStep(state) {
      if (state.currentStep < stepperMap[OnboardingStepEnum.FourthStep]) {
        state.currentStep += 1;
      }
    },
    prevStep(state) {
      if (state.currentStep > stepperMap[OnboardingStepEnum.FirstStep]) {
        state.currentStep -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOnboardingData.fulfilled, (state, { payload }) => {
      state.currentStep = stepperMap[payload.currentStep];
      state.isInitialLoading = false;
      state.onboardingData = payload;
    });
    builder.addCase(updateOnboardingData.fulfilled, (state, { payload }) => {
      state.onboardingData = payload;
      if (state.currentStep < stepperMap[OnboardingStepEnum.FourthStep]) {
        state.currentStep += 1;
      }
    });
  },
});

export const { resetState, nextStep, prevStep } = onboardingSlice.actions;

export default onboardingSlice.reducer;
