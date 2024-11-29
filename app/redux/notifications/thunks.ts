import { createAsyncThunk } from '@reduxjs/toolkit';

import notificationService from '@/app/services/notificationService';
import { handleThunkApiError } from '../../utils';

export const createNotification = createAsyncThunk(
  'notifications/createNotification',
  handleThunkApiError(notificationService.createNotification)
);

export const getNotifications = createAsyncThunk(
  'getNotifications',
  handleThunkApiError(notificationService.getNotificationsList)
);

export const readAllNotifications = createAsyncThunk(
  'readNotifications',
  handleThunkApiError(notificationService.readAllNotifications)
);
