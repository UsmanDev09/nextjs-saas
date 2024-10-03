'use client'
import { useEffect, useState } from 'react';

export default function Friends() {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imdob3N0QHNoYXBlci51cyIsInN1YiI6ImNmMDJlMzg4LWNkNjUtNGU3MC1iMzhkLTMwMTVmNTRkNGJlMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzI3NzI1NjI0LCJleHAiOjE3Mjc3MjkyMjR9.IT09w7Hgv7cjOeh7bWLAx4afaz_jskpM0fZAMgyt9Mc';
      const response = await fetch('/api/profile/friends', {
        headers: {
          'Authorization': `Bearer ${token}`,
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
        {friends.length>0&&friends.map((friend: any) => (
          <li key={friend.id}>{friend.name}</li>
        ))}
      </ul>
    </div>
  );
}