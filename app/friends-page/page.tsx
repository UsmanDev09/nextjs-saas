'use client'
import { useState, useEffect } from 'react'
import { XMarkIcon, MagnifyingGlassIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
interface Friend {
  id: string
  name: string
  username: string
  avatar: {
    path: string
  }
  level: number
}

interface FriendsResponse {
  items: Friend[]
  page: number
  limit: number
  total: number
  hasMore: boolean
}

export default function FriendsComponent() {
  const [friends, setFriends] = useState<FriendsResponse | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (isOpen) {
      fetchFriends()
    }
  }, [isOpen])

  const fetchFriends = async () => {
    try {
    const accessToken = Cookies.get('accessToken')
      
      if (!accessToken) {
        console.error('No access token found')
        return
      }
      const response = await fetch('/api/profile/friends', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      const data = await response.json()
      setFriends(data)
    } catch (error) {
      console.error('Error fetching friends:', error)
    }
  }

  const filteredFriends = friends?.items?.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    <div>
      {/* Friends Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-16 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <UserGroupIcon className="w-6 h-6 text-purple-500" />
      </button>

      {/* Friends Modal */}
      {isOpen && (
        <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold">Friends</h2>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4">
            <div className="flex space-x-4 mb-4">
              {['All', 'Online', 'Global'].map((tab) => (
                <button
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
              {filteredFriends.map((friend, index) => (
                <div key={friend.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
                    {friend.avatar?.path ? (
                      <img src={friend.avatar.path} alt={friend.name} className="w-full h-full object-cover" />
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
                    <span className="text-sm font-medium text-purple-700">{friend.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}