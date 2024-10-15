import type { IFullUserResponse } from '@/data-transfer/responses';

export interface IAuthContext {
  isLoading: boolean;
  user: IFullUserResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  isSignedIn: boolean;
}

export interface ISignInParams {
  email: string;
  password: string;
}
