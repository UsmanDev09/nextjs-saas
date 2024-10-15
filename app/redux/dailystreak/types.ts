import type { IDailyStreakRewardData } from '@/data-transfer/responses';

export default interface IDailyStreak {
  status: boolean;
  message: string;
  data?: any;
  time?: string;
}
