'use client';

import Admin from '@/components/admin';
import { useSession } from 'next-auth/react';

function AdminPage() {
  const session = useSession();
  if (!session) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">
          Please Sign in to access this page!
        </h1>
      </div>
    );
  }

  return <Admin loggedInUser={session?.user} />;
}

export default AdminPage;
