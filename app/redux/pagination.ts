import type { IBasePaginationState } from './types';

export const initialPagination = {
  isLoading: false,
  page: 1,
  limit: 100,
  hasMore: true,
  total: 0,
};

export const resetPaginationBase = <T extends IBasePaginationState>(state: T, initial: T) => {
  state.isLoading = initial.isLoading;
  state.page = initial.page;
  state.limit = initial.limit;
  state.total = initial.total;
  state.hasMore = initial.hasMore;
};
