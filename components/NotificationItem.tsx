import { PuzzlePieceIcon, UserIcon } from '@heroicons/react/24/outline';

interface Notification {
  id: string;
  notificationMessage: string;
  createdAt: string;
  notificationType: {
    notificationName: string;
  };
  userRequestAction: string;
}

export default function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      })
      .toUpperCase();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'Friend Request':
      case 'Friend Request Accepted':
        return <UserIcon className="w-10 h-10 text-white" />;
      case 'Game Request':
        return <PuzzlePieceIcon className="w-10 h-10 text-white" />;
      default:
        return <UserIcon className="w-10 h-10 text-white" />;
    }
  };

  const getStatusTag = (action: string) => {
    if (action === 'accepted') {
      return (
        <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
          ACCEPTED
        </span>
      );
    }
    return null;
  };
  return (
    <div className="flex items-start space-x-3 mb-4">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
        {getNotificationIcon(notification.notificationType.notificationName)}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">
          {notification.notificationMessage}
        </p>
        <p className="text-xs text-gray-500">
          {formatDate(notification.createdAt)}
        </p>
      </div>
      {getStatusTag(notification.userRequestAction)}
    </div>
  );
}
