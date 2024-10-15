import axios from 'axios';

import { envUtil } from '@/utils';

import type { IFullUserResponse } from '@/data-transfer/responses';
import type { ISignInParams } from '@/types';
import type { IAuthOptions } from '@devimasolutions/auth';

const createAxiosInstance = () => {
  const { backendUrl } = envUtil.getEnv();
  return axios.create({
    baseURL: `${backendUrl}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const createAuthOptions = () => {
  const axiosInstance = createAxiosInstance();
  const authOptions: IAuthOptions<IFullUserResponse, ISignInParams> = {
    axiosInstance,
    signIn: (signInParams, manager) => manager.axios.post('/auth/sign-in', signInParams),
    signOut: () => Promise.resolve(),
    refreshToken: (manager) =>
      manager.axios.post('/auth/refresh', { refreshToken: manager.getRefreshToken() }),
    getUser: (manager) => manager.axios.get('/auth/profile'),
  };

  return authOptions;
};

export default createAuthOptions;
