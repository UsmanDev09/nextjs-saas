'use client';

import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface UserProfile {
  id: string;
  user_id: string;
  age: number | null;
  gender: string | null;
  phoneNumber: string | null;
}

interface User {
  id: string;
  name: string;
  username: string;
}

export default function UserProfile() {
  const accessToken = Cookies.get('accessToken');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setProfile(data.userProfile);
        setUser(data.user);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load user profile');
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [accessToken]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (profile) {
      setProfile({ ...profile, [name]: value });
    }
    if (user && (name === 'name' || name === 'username')) {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/user-profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user?.name,
          username: user?.username,
          age: profile?.age,
          gender: profile?.gender,
          phoneNumber: profile?.phoneNumber,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedData = await response.json();
      setProfile(updatedData.profile);
      setIsEditing(false);
      setIsLoading(false);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={user?.name || ''}
                onChange={handleInputChange}
              />
            </label>

          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={user?.username || ''}
                onChange={handleInputChange}
              />
            </label>

          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="age"
                type="number"
                name="age"
                value={profile?.age || ''}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="gender"
                type="text"
                name="gender"
                value={profile?.gender || ''}
                onChange={handleInputChange}
              />
            </label>

          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={profile?.phoneNumber || ''}
                onChange={handleInputChange}
              />
            </label>

          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Name:</strong>
            {' '}
            {user?.name}
          </p>
          <p className="mb-2">
            <strong>Username:</strong>
            {' '}
            {user?.username}
          </p>
          <p className="mb-2">
            <strong>Age:</strong>
            {' '}
            {profile?.age}
          </p>
          <p className="mb-2">
            <strong>Gender:</strong>
            {' '}
            {profile?.gender}
          </p>
          <p className="mb-2">
            <strong>Phone Number:</strong>
            {' '}
            {profile?.phoneNumber}
          </p>
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}
