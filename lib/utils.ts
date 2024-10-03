import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import { OnboardingData, FirstStep, SecondStep, ThirdStep, FourthStep } from './types';

export class OnboardingRequest {
  private firstStep?: FirstStep;
  private secondStep?: SecondStep;
  private thirdStep?: ThirdStep;
  private fourthStep?: FourthStep;

  constructor(data: OnboardingData) {
    this.firstStep = data.firstStep;
    this.secondStep = data.secondStep;
    this.thirdStep = data.thirdStep;
    this.fourthStep = data.fourthStep;
  }
  public getFourthStep(): FourthStep | undefined {
    return this.fourthStep;
  }
  getData(userId: string, usersToSkills: any): {
    name?: string;
    usersToSkills: any;
    profile: {
      user: {
        id: string;
      };
      [key: string]: any;
    };
  } {
    const { name, ...rest } = this.firstStep || {};

    const user = name ? { name, usersToSkills } : { usersToSkills };

    return {
      ...user,
      profile: {
        ...rest,
        ...(this.secondStep || {}),
        ...(this.thirdStep || {}),
        user: {
          id: userId,
        },
      },
    };
  }
}

export class OnboardingResponse {
  firstStep: OnboardingFirstStepResponse;
  secondStep: OnboardingSecondStepResponse;
  thirdStep: OnboardingThirdStepResponse;

  constructor(user: any) {
    this.firstStep = new OnboardingFirstStepResponse(user);
    this.secondStep = new OnboardingSecondStepResponse(user.profile);
    this.thirdStep = new OnboardingThirdStepResponse(user.profile);
  }

  get complete(): boolean {
    return Object.values(this).every(item => item.complete);
  }

  get currentStep(): string {
    const index = Object.values(this).findIndex(item => !item.complete);
    const keys = Object.keys(this);
    return index === -1 ? keys[keys.length - 1] : keys[index];
  }
}

export class OnboardingFirstStepResponse {
  name: string | null;
  age: number | null;
  gender: string | null;

  constructor(user: any) {
    this.name = user.name;
    this.age = user?.profile?.age || null;
    this.gender = user?.profile?.gender || null;
  }

  get complete(): boolean {
    return [this.name, this.age, this.gender].every(item => item !== null && item !== '');
  }
}

export class OnboardingSecondStepResponse {
  profileType: string | null;

  constructor(profile: any) {
    this.profileType = profile?.profileType || null;
  }

  get complete(): boolean {
    return !!this.profileType;
  }
}

export class OnboardingThirdStepResponse {
  learningPace: string | null;

  constructor(profile: any) {
    this.learningPace = profile?.learningPace || null;
  }

  get complete(): boolean {
    return !!this.learningPace;
  }
}

// Define interfaces for the data objects
interface FriendRequestData {
  name: string;
}

interface GameRequestData {
  name: string;
}

interface AchievementData {
  name: string;
}

type TemplateFunction<T = void> = T extends void ? () => string : (data: T) => string;
const NotificationTemplate = {
  Welcome: () => 
    `Welcome! We're thrilled to have you here. Dive in, explore, and enjoy your journey with us.
If you need anything, we're here to help!
-The Shaper Team`,

  FriendRequest: (data: FriendRequestData) => 
    `${data.name} wants to be your friend`,

  FriendRequestAccepted: (data: FriendRequestData) => 
    `Friend request accepted by ${data.name}`,

  GameRequest: (data: GameRequestData) => 
    `${data.name} wants to play with you`,

  AchievementUnlocked: (data: AchievementData) => 
    `A ${data.name} achievement has been unlocked for you.`,
};
type NotificationTemplatesType = {
  [K in keyof typeof NotificationTemplate]: TemplateFunction<
    K extends 'Welcome' ? void : 
    K extends 'FriendRequest' | 'FriendRequestAccepted' ? FriendRequestData :
    K extends 'GameRequest' ? GameRequestData :
    K extends 'AchievementUnlocked' ? AchievementData :
    never
  >
};
const NotificationTemplates: NotificationTemplatesType = NotificationTemplate;

export default NotificationTemplates;