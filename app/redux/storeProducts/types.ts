import type { IRewardClaimResponse } from '@/data-transfer/responses/store/rewardClaim.response';
import type { StoreCategory } from '@/data-transfer/responses/store/storeProducts.response';

export default interface IStoreState {
  storedata: StoreCategory;
  dailyRewards: IRewardClaimResponse;
  luckyRewards: any;
}
