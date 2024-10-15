import type { IBaseOrderQuery, IBasePaginationQuery } from '@/data-transfer/queries';

export interface IBasePaginationState extends IBasePaginationQuery {
  isLoading: boolean;
  hasMore: boolean;
  total: number;
}

export type IBaseOrderState = IBaseOrderQuery;
