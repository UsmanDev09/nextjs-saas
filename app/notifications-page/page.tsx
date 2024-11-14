'use client';

import { useState, useEffect } from 'react';
import {
  XMarkIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import NotificationItem from '@/components/NotificationItem';
import { toast } from 'react-toastify';

interface Notification {
  id: string;
  notificationMessage: string;
  createdAt: string;
  notificationType: {
    notificationName: string;
  };
  userRequestAction: string;
}

interface NotificationsResponse {
  todays: {
    total: number;
    data: Notification[];
  };
  others: {
    total: number;
    data: Notification[];
  };
  unreadCount: number;
}

export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState<NotificationsResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const accessToken = Cookies.get('accessToken');

        if (!accessToken) {
          toast.error('No access token found!');
          return;
        }

        const response = await fetch('/api/notification', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }

        const data = await response.json();
        setNotifications(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(`Error fetching notifications:', ${error}`);
        } else {
          toast.error('Error fetching notifications');
        }
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <BellIcon className="w-6 h-6 text-purple-500" />
        {notifications && notifications.unreadCount > 0 && (
          <span className="absolute top-[19%] left-[2%] inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {notifications.unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-5 flex items-start justify-start ml-[5%] pl-5 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-96 max-h-[80vh] overflow-hidden mt-20 mr-4">
            <div className="flex items-center justify-between p-4">
              <h2 className="text-xl font-semibold">Notifications</h2>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="overflow-y-auto bg-gray-100 m-2 rounded-2xl max-h-[calc(80vh-64px)]">
              {notifications && (
                <>
                  {notifications.todays.total > 0 && (
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">
                        TODAY
                      </h3>
                      {notifications.todays.data.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      ))}
                    </div>
                  )}
                  {notifications.others.total > 0 && (
                    <div className="p-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-2">
                        OLDER
                      </h3>
                      {notifications.others.data.map((notification) => (
                        <NotificationItem
                          key={notification.id}
                          notification={notification}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
