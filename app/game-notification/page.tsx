"use client"
import React, { useState } from 'react';

export default function GameRequestPage() {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const currentDate = new Date();
    const expiryDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

    const requestBody = {
      notification_type_id: "ac828629-4c4f-4112-bbad-665c57d0cd38", // Game request type ID
      user_id: userId,
      from_user_id: "781dab97-10dd-40d0-83e4-0a0b8258a830", // This should be the logged-in user's ID in a real app
      notification_message: message || "You've been invited to play a game!",
      notification_link: "",
      expiry_date: expiryDate.toISOString()
    };

    try {
      const response = await fetch('/api/notification/game-request-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Failed to send game request');
      }

      setSuccess('Game request sent successfully!');
      setUserId('');
      setMessage('');
    } catch (error:any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Send a Game Request
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                Friend's User ID
              </label>
              <div className="mt-1">
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message (Optional)
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Game Request'}
              </button>
            </div>
          </form>

          {error && (
            <div className="mt-4 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 text-center text-sm text-green-600">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}