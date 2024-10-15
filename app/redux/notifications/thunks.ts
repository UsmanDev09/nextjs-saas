import { createAsyncThunk } from '@reduxjs/toolkit';

import notificationService from '@/services/dashboard/notificaton.service';
import { handleThunkApiError } from '@/utils';

export const getNotifications = createAsyncThunk(
  'getNotifications',
  handleThunkApiError(notificationService.getNotificationsList),
);

export const readAllNotifications = createAsyncThunk(
  'readNotifications',
  handleThunkApiError(notificationService.readAllNotifications),
);
