import { createAsyncThunk } from '@reduxjs/toolkit';

import friendsService from '@/services/friends.service';
import { handleThunkApiError } from '@/utils';

import type { RootState } from '../store';
import type { IFriendsPaginationQuery } from '@/data-transfer/queries';
import type { IFullUserResponse, IPaginationResponse } from '@/data-transfer/responses';

export const getFriends = createAsyncThunk(
  'friends/getFriends',
  handleThunkApiError<
    Pick<IFriendsPaginationQuery, 'search'> &
      Partial<Pick<IFriendsPaginationQuery, 'orderBy' | 'orderDirection'>>,
    IPaginationResponse<IFullUserResponse> | undefined
  >(
    async (params, thunkAPI) => {
      const state = thunkAPI?.getState() as RootState;
      const { page, limit } = state?.friends;
      const search = params.search;
      const orderBy = params.orderBy ?? state.friends.orderBy;
      const orderDirection = params.orderDirection ?? state.friends.orderDirection;

      const result = await friendsService.getFriends({
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

export const removeFriend = createAsyncThunk(
  'auth/removeFriend',
  handleThunkApiError(friendsService.removeFriend),
);
