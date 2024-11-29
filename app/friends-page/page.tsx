'use client';

import { useState, useEffect, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: {
    path: string;
  };
  level: number;
}

interface FriendsResponse {
  items: Friend[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export default function FriendsComponent() {
  const [friends, setFriends] = useState<FriendsResponse | null>(null);
  const [isOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchFriends = useCallback(async () => {
    try {
      const accessToken = Cookies.get('accessToken');

      if (!accessToken) {
        toast.error('No access token found');

        return;
      }

      const response = await fetch('/api/profile/friends', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      setFriends(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Error fetching friends: ${error.message}`);
      } else {
        toast.error('Error fetching friends');
      }
    }
  }, [setFriends]);

  useEffect(() => {
    if (isOpen) {
      fetchFriends();
    }
  }, [isOpen, fetchFriends]);

  const filteredFriends =
    friends?.items?.filter(
      (friend) =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div>
      {/* Friends Modal */}
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">Friends</h2>
        </div>
        <div className="p-4">
          <div className="flex space-x-4 mb-4">
            {['All', 'Online', 'Global'].map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-full ${
                  activeTab === tab
                    ? 'bg-purple-100 text-white'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Email or nick name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <div className="space-y-4">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                  {friend.avatar?.path ? (
                    <img
                      src={friend.avatar.path}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      {friend.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <p className="font-medium">{friend.name}</p>
                  <p className="text-sm text-gray-500">@{friend.username}</p>
                </div>
                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-purple-700">
                    {friend.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
