'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon, UserIcon, PuzzlePieceIcon, BellIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'

interface Notification {
  id: string
  notificationMessage: string
  createdAt: string
  notificationType: {
    notificationName: string
  }
  userRequestAction: string
}

interface NotificationsResponse {
  todays: {
    total: number
    data: Notification[]
  }
  others: {
    total: number
    data: Notification[]
  }
  unreadCount: number
}

export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState<NotificationsResponse | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      const accessToken = Cookies.get('accessToken')
      
      if (!accessToken) {
        console.error('No access token found')
        return
      }

      const response = await fetch('/api/notification', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch notifications')
      }

      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }).toUpperCase()
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'Friend Request':
      case 'Friend Request Accepted':
        return <UserIcon className="w-10 h-10 text-purple-500" />
      case 'Game Request':
        return <PuzzlePieceIcon className="w-10 h-10 text-purple-500" />
      default:
        return <UserIcon className="w-10 h-10 text-purple-500" />
    }
  }

  const getStatusTag = (action: string) => {
    if (action === 'accepted') {
      return <span className="px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">ACCEPTED</span>
    }
    return null
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <BellIcon className="w-6 h-6 text-purple-500" />
        {notifications && notifications.unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {notifications.unreadCount}
          </span>
        )}
      </button>
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Notifications</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="overflow-y-auto h-full pb-20">
            {notifications && (
              <>
                {notifications.todays.total > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">TODAY</h3>
                    {notifications.todays.data.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                )}
                {notifications.others.total > 0 && (
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">OLDER</h3>
                    {notifications.others.data.map((notification) => (
                      <NotificationItem key={notification.id} notification={notification} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )

  function NotificationItem({ notification }: { notification: Notification }) {
    return (
      <div className="flex items-start space-x-3 mb-4">
        {getNotificationIcon(notification.notificationType.notificationName)}
        <div className="flex-1">
          <p className="text-sm font-medium">{notification.notificationMessage}</p>
          <p className="text-xs text-gray-500">{formatDate(notification.createdAt)}</p>
        </div>
        {getStatusTag(notification.userRequestAction)}
      </div>
    )
  }
}