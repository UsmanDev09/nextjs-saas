'use client';
import { useState } from 'react';
import {
  BellIcon,
  UserGroupIcon,
  Squares2X2Icon,
  CubeIcon,
  LinkIcon,
  PencilIcon,
  BeakerIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import NotificationsComponent from '@/app/notifications-page/page';
import FriendsComponent from '@/app/friends-page/page';

export default function Admin({ loggedInUser }: any) {
  const [activeTab, setActiveTab] = useState('Week');
  console.log(loggedInUser)

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-20 bg-white shadow-md flex flex-col items-center py-6 space-y-8">
        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          1
        </div>
        <NotificationsComponent />
        <div className="flex-grow" />
        <ArrowRightOnRectangleIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
      </div>

      {/* Main Content */}
      <div className='flex justify-center w-full'>
        <div className="flex justify-center items-center min-w-[55%] p-4">
          <div className="max-w-4xl mx-[5%] space-y-8 flex-grow">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Hello, {loggedInUser}</h1>
              <p className="text-sm text-gray-500">You have no new game requests</p>
            </div>

            {/* Game of the Day */}
            <div className="bg-purple-500 rounded-lg p-6 text-white">
              <p className="text-sm mb-2">GAME OF THE DAY</p>
              <h2 className="text-2xl font-bold">Grid-based</h2>
            </div>

            {/* Level and XP */}
            <div className="flex gap-6">
              <div className="bg-white rounded-lg p-4 flex-1 shadow">
                <p className="text-lg font-semibold">lvl. 1</p>
                <div className="bg-gray-200 h-2 rounded-full mt-2">
                  <div className="bg-purple-500 h-2 rounded-full w-0" />
                </div>
                <p className="text-sm text-gray-500 mt-1">0/100 XP</p>
              </div>

              <div className="bg-white rounded-lg p-4 flex-1 shadow">
                <div className="flex items-center">
                  <img
                    src="/coin.svg"
                    alt="Coin"
                    className="w-6 h-6 mr-2 rounded-[50%]"
                  />
                  <span className="font-semibold">3</span>
                </div>
                <div className="bg-yellow-400 h-2 rounded-full mt-2" />
                <p className="text-sm text-gray-500 mt-1">0:0</p>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Achievements 1/40</h3>
                <button className="text-sm text-purple-500 font-medium">SEE ALL</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <img
                        src="/knowledge_seeker.png?height=24&width=24"
                        alt="Gift"
                        className="w-6 h-6 mr-2"
                      />
                      <span className="font-medium">Big Spender</span>
                    </div>
                    <img
                      src="/diamond.png?height=24&width=24"
                      alt="Diamond"
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="bg-green-500 h-2 rounded-full" />
                  <p className="text-sm text-gray-500 mt-1">100%</p>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <img
                        src="/trivia_enthusiast.png?height=24&width=24"
                        alt="Lock"
                        className="w-6 h-6 mr-2"
                      />
                      <span className="font-medium">Social Butterfly</span>
                    </div>
                    <img
                      src="/box.png?height=24&width=24"
                      alt="Badge"
                      className="w-6 h-6"
                    />
                  </div>
                  <div className="bg-red-500 h-2 rounded-full w-1/5" />
                  <p className="text-sm text-gray-500 mt-1">20%</p>
                </div>
              </div>
            </div>

            {/* Skill Progress */}
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Skill Progress</h3>
                <div className="flex space-x-2">
                  {['Week', 'Month'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-1 rounded-full text-sm font-medium ${activeTab === tab
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-500 hover:bg-gray-100'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {['Adaptability', 'Time Management'].map((skill) => (
                  <div key={skill} className="flex items-center">
                    <span className="w-1/3 text-sm">{skill}</span>
                    <div className="flex-grow bg-gray-200 h-2 rounded-full">
                      <div className="bg-purple-500 h-2 rounded-full w-0" />
                    </div>
                    <span className="w-16 text-right text-sm text-gray-500">0/25</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-94 p-10 mt-[5%] justify-between flex flex-col space-y-6">
          {/* Diamonds Section */}
          <div className="bg-white p-4 rounded-lg flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-700 mb-2">Diamonds</span>
              <span className="text-2xl font-bold text-purple-500">200</span>
            </div>

            <div className="flex items-center">
              <img
                src="/diamond.png?height=24&width=24"
                alt="Diamond"
                className="p-2 rounded-[50%] bg-gray-100 w-12 h-12"
              />
            </div>
          </div>


          {/* Friends Component */}
          <div className="bg-white p-4 h-full rounded-lg">
            <FriendsComponent />
          </div>
        </div>
      </div>

    </div>
  );
}
