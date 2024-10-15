import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/redux/store';

export const authorizationsStateSelector = ({ auth }: RootState) => auth;

export const resetPasswordSent = createSelector(
  authorizationsStateSelector,
  (state) => state.isResetPasswordSent,
);

export const isLoggedIn = createSelector(authorizationsStateSelector, (state) => state.isLoggedIn);
