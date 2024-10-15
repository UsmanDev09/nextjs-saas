import { createSlice } from '@reduxjs/toolkit';

import { FriendsOrderBy, OrderDirection } from '@/constants';

import { initialPagination, resetPaginationBase } from '../pagination';

import { getFriends } from './thunks';

import type IFriendsState from './types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IFriendsState = {
  friends: [],
  search: '',
  orderDirection: OrderDirection.ASC,
  orderBy: FriendsOrderBy.level,
  ...initialPagination,
};

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    resetState: () => initialState,
    resetPagination: (state) => resetPaginationBase(state, initialState),
    deleteFriend: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter((friend) => friend.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      }
      if (payload.items.length) {
        const existingFriendsIdSet = new Set(state.friends.map((item) => item.id));
        state.friends.push(...payload.items.filter((item) => !existingFriendsIdSet.has(item.id)));
      } else {
        //search request has no results
        state.friends = [];
      }
      state.hasMore = payload.hasMore;
      state.page = payload.hasMore ? payload.page + 1 : state.page;
      state.total = payload.total;
      state.isLoading = false;
    });
    builder.addCase(getFriends.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFriends.rejected, (state) => {
      resetPaginationBase(state, initialState);
    });
  },
});

export const { resetState, deleteFriend } = friendsSlice.actions;

export default friendsSlice.reducer;
