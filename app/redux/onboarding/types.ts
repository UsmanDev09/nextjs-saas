import type { IGetOnboardingDataResponse } from '@/data-transfer/responses';

export default interface IOnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  isInitialLoading: boolean;
  onboardingData?: IGetOnboardingDataResponse;
}
