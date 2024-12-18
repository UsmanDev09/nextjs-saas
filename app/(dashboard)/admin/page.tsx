'use client';

import Admin from '@/components/admin';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function AdminPage() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session?.user) {
    toast.error('User not logged in');
    router.push('/sign-in');
    return null;
  }

  return <Admin loggedInUser={session?.user.name} />;
}

export default AdminPage;
