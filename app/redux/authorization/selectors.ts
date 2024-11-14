import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/app/redux/store';

export const authorizationsStateSelector = ({ auth }: RootState) => auth;

export const profile = createSelector(
  authorizationsStateSelector,
  (state) => state.profile,
);
