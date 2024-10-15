import type { IBaseOrderState, IBasePaginationState } from '../types';
import type { IFullUserResponse } from '@/data-transfer/responses';

export default interface IFriendsState extends IBasePaginationState, IBaseOrderState {
  friends: IFullUserResponse[];
  search: string;
}
