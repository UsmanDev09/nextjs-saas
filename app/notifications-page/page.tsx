'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Notification {
  id: string;
  notificationMessage: string;
  createdAt: string;
  userAction: string;
  notificationType: {
    name: string;
  };
  fromUser: {
    name: string;
    files?: {
      url: string;
    }[];
  };
}

interface NotificationsResponse {
  todays: {
    total: number;
    data: Notification[];
  };
  others: {
    data: Notification[];
    total: number;
    currentPage: number;
    totalPages: number;
  };
  unreadCount: number;
}

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdob3N0QHNoYXBlci51cyIsInN1YiI6ImNmMDJlMzg4LWNkNjUtNGU3MC1iMzhkLTMwMTVmNTRkNGJlMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI3OTY5MzgwLCJleHAiOjE3Mjc5NzI5ODB9.e9JAh4YoqkZ0lAHc3043v-tZO2VzwZbY_hFMvcoW_BA'
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get<NotificationsResponse>(`/api/notification`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNotifications(response.data);
        setError(null);
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.status === 401) {
          setError('Unauthorized access. Please log in again.');
          // Redirect to login page
          router.push('/login');
        } else {
          setError('Failed to fetch notifications');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [page, limit, router]);

  const renderNotification = (notification: Notification) => (
    <div key={notification.id} className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-2">
        {notification.fromUser?.files && notification.fromUser?.files.length > 0 && notification.fromUser?.files[0].url && (
          <img
            src={notification.fromUser.files[0].url}
            alt={notification.fromUser.name}
            className="w-10 h-10 rounded-full mr-3"
          />
        )}
        <div>
          <h3 className="font-semibold">{notification.fromUser?.name}</h3>
          <p className="text-sm text-gray-500">{notification.notificationType.name}</p>
        </div>
      </div>
      <p className="text-gray-700">{notification.notificationMessage}</p>
      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>{new Date(notification.createdAt).toLocaleString()}</span>
        <span className={`px-2 py-1 rounded ${
          notification.userAction === 'unread' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'
        }`}>
          {notification.userAction}
        </span>
      </div>
    </div>
  );

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!notifications) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <div className="mb-4">
        <span className="font-semibold">Unread notifications:</span> {notifications.unreadCount}
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Today's Notifications</h2>
      {notifications.todays.data.map(renderNotification)}
      
      <h2 className="text-2xl font-semibold my-6">Earlier Notifications</h2>
      {notifications.others.data.map(renderNotification)}
      
      <div className="mt-6 flex justify-between items-center">
        <a
          href={`/notifications?page=${Math.max(1, page - 1)}&limit=${limit}`}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${page <= 1 ? 'pointer-events-none opacity-50' : ''}`}
        >
          Previous
        </a>
        <span>Page {page} of {notifications.others.totalPages}</span>
        <a
          href={`/notifications?page=${Math.min(notifications.others.totalPages, page + 1)}&limit=${limit}`}
          className={`bg-blue-500 text-white px-4 py-2 rounded ${page >= notifications.others.totalPages ? 'pointer-events-none opacity-50' : ''}`}
        >
          Next
        </a>
      </div>
    </div>
  );
};

export default NotificationsPage;