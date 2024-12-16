interface NotificationData {
  id: string;
  message: string;
  date: string;
}

export interface INotificationsState {
  notifications: {
    todays: {
      total: number;
      data: NotificationData[];
    };
    others: {
      total: number;
      currentPage: number;
      data: NotificationData[];
      totalPages: number;
    };
  };
}
