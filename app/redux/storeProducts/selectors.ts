import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/redux/store';

export const storeProductSelector = ({ storeProduct }: RootState) => storeProduct;

export const storeProductListing = createSelector(storeProductSelector, (state) => state.storedata);

export const dailyRewards = createSelector(storeProductSelector, (state) => state.dailyRewards);
export const luckyRewards = createSelector(storeProductSelector, (state) => state.luckyRewards);
