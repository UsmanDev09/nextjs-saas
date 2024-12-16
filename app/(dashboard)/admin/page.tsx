'use client';

import Admin from '@/components/admin';
import { useSession } from 'next-auth/react';

function AdminPage() {
  const { data: session, status } = useSession();
  if (status === 'unauthenticated') {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">
          Please Sign in to access this page!
        </h1>
      </div>
    );
  }
  return <Admin loggedInUser={session?.user.name as string} />;
}

export default AdminPage;
