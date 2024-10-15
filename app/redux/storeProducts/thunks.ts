import { createAsyncThunk } from '@reduxjs/toolkit';

import storeProductService from '@/services/store/storeProduct.service';
import { handleThunkApiError } from '@/utils';

export const getStoreProduct = createAsyncThunk(
  'store/category',
  handleThunkApiError(storeProductService.getStoreData),
);

export const getRewards = createAsyncThunk(
  'store/dailyRewards',
  handleThunkApiError(storeProductService.getRewardCalender),
);

export const getLuckyRewards = createAsyncThunk(
  'store/luckyRewards',
  handleThunkApiError(storeProductService.getLuckyRewards),
);
