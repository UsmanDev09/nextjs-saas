export interface FirstStep {
    name?: string;
    [key: string]: any;
  }
  
  export interface SecondStep {
    [key: string]: any;
  }
  
  export interface ThirdStep {
    [key: string]: any;
  }
  
  export interface FourthStep {
    [key: string]: any;
  }
  
  export interface OnboardingData {
    firstStep?: FirstStep;
    secondStep?: SecondStep;
    thirdStep?: ThirdStep;
    fourthStep?: FourthStep;
  }