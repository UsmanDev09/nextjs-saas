import type { IAchievementsItem } from '@/components/AchievementsItem/types';

export default interface IUserAchievementsState {
  achievements: {
    completedAchievementsCount: number;
    data: IAchievementsItem[];
  };
}
