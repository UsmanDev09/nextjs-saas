import type { IBaseOrderState, IBasePaginationState } from '../types';
import type { IFullUserResponse } from '@/data-transfer/responses';

export default interface IGlobalUsersState extends IBasePaginationState, IBaseOrderState {
  globalUsers: IFullUserResponse[];
  search: string;
}
