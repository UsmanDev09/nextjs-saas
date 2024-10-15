import { createSlice } from '@reduxjs/toolkit';

import { FriendsOrderBy, OrderDirection } from '@/constants';

import { initialPagination, resetPaginationBase } from '../pagination';

import { getGlobalUsers } from './thunks';

import type IGlobalUsersState from './types';
// import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IGlobalUsersState = {
  globalUsers: [],
  search: '',
  orderDirection: OrderDirection.ASC,
  orderBy: FriendsOrderBy.level,
  ...initialPagination,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetState: () => initialState,
    resetPagination: (state) => resetPaginationBase(state, initialState),
  },
  extraReducers: (builder) => {
    builder.addCase(getGlobalUsers.fulfilled, (state, { payload }) => {
      if (!payload) {
        return;
      }
      if (payload.items.length) {
        const existingFriendsIdSet = new Set(state.globalUsers.map((item) => item.id));
        state.globalUsers.push(
          ...payload.items.filter((item: any) => !existingFriendsIdSet.has(item.id)),
        );
      } else {
        //search request has no results
        state.globalUsers = [];
      }
      state.hasMore = payload.hasMore;
      state.page = payload.hasMore ? payload.page + 1 : state.page;
      state.total = payload.total;
      state.isLoading = false;
    });
    builder.addCase(getGlobalUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getGlobalUsers.rejected, (state) => {
      resetPaginationBase(state, initialState);
    });
  },
});

export const { resetState } = dashboardSlice.actions;

export default dashboardSlice.reducer;
