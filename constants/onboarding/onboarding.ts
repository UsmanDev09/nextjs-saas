import { OnboardingStepEnum } from './enums';

import type IOnboardingState from '@/redux/onboarding/types';

export const stepperMap: Record<OnboardingStepEnum, IOnboardingState['currentStep']> = {
  [OnboardingStepEnum.FirstStep]: 1,
  [OnboardingStepEnum.SecondStep]: 2,
  [OnboardingStepEnum.ThirdStep]: 3,
  [OnboardingStepEnum.FourthStep]: 4,
};
