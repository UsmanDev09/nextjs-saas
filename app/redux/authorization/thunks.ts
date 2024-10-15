import { createAsyncThunk } from '@reduxjs/toolkit';

import { authorizationService } from '@/services';
import { handleThunkApiError } from '@/utils';

export const sendForgotPassword = createAsyncThunk(
  'auth/sendForgotPassword',
  handleThunkApiError(authorizationService.sendForgotPassword),
);
