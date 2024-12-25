'use client';

import Admin from '@/components/admin';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('User not logged in');
      router.push('/sign-in');
    }
  }, [status, router]);
  if (status === 'loading') {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }
  if (status === 'authenticated' && session?.user) {
    return <Admin loggedInUser={session.user.name} />;
  }
  return null;
}

export default AdminPage;
