import Admin from '@/components/admin';
import { getServerSession } from 'next-auth/next';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  if (!accessToken && !session) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-[100vh] p-4">
        <h1 className="text-2xl font-bold">
          Please Sign in to access this page!
        </h1>
        <div>
          <Link
            href="/sign-in"
            className="text-gray-500 hover:text-primary-500"
          >
            Return to Sign in!
          </Link>
        </div>
      </div>
    );
  }
  let loggedInUser;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/logged-in-user`,
      {
        headers: {
          Authorization: `Bearer ${accessToken?.value}`,
        },
      }
    );
    const data = await response.json();
    loggedInUser = session?.user?.name || data?.user.name || 'User';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    loggedInUser = session?.user?.name || 'User';
  }

  return (
    <div>
      <Admin loggedInUser={loggedInUser} />
    </div>
  );
}
