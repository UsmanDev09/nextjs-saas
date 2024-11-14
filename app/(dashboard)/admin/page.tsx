import Admin from '@/components/admin';
import { cookies } from 'next/headers';

async function AdminPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken) {
    return (
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">
          Please Sign in to access this page!
        </h1>
      </div>
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logged-in-user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken?.value}`,
      },
    },
  );

  const data = await response.json();
  const loggedInUser = data?.user?.name || '';

  return <Admin loggedInUser={loggedInUser} />;
}

export default AdminPage;
