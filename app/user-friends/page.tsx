'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const accessToken = Cookies.get('accessToken');
      const response = await fetch('/api/profile/friends', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFriends(data);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div>
      <h1>Welcome, User</h1>
      <h2>Your Friends:</h2>
      <ul>
        {friends.length > 0 &&
          friends.map((friend: { id: string; name: string }) => (
            <li key={friend.id}>{friend.name}</li>
          ))}
      </ul>
    </div>
  );
}
