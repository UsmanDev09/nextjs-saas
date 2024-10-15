import { createAsyncThunk } from '@reduxjs/toolkit';

import { dashboardService } from '@/services';
import { handleThunkApiError } from '@/utils';

import type { RootState } from '../store';
import type { IFriendsPaginationQuery } from '@/data-transfer/queries';
import type { IFullUserResponse, IPaginationResponse } from '@/data-transfer/responses';

export const getGlobalUsers: any = createAsyncThunk(
  'dashboard/getGlobalUsers',
  handleThunkApiError<
    Pick<IFriendsPaginationQuery, 'search'> &
      Partial<Pick<IFriendsPaginationQuery, 'orderBy' | 'orderDirection'>>,
    IPaginationResponse<IFullUserResponse> | undefined
  >(
    async (params, thunkAPI) => {
      const state = thunkAPI?.getState() as RootState;
      const { page, limit } = state?.dashboard;
      const search = params.search;
      const orderBy = params.orderBy ?? state.dashboard.orderBy;
      const orderDirection = params.orderDirection ?? state.dashboard.orderDirection;

      const result = await dashboardService.getGlobalUsers({
        page,
        limit,
        search: search,
        orderBy: orderBy,
        orderDirection: orderDirection,
      });
      return result;
    },
    { showToast: true },
  ),
);
export const getBannerPath = createAsyncThunk(
  'getBannerPath',
  handleThunkApiError(dashboardService.getBanner),
);
