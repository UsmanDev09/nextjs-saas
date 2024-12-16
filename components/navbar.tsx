import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { Shell } from 'lucide-react';

import UserAccountNav from './UserAccountNav';

async function Navbar() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <div className="bg-zinc-100 py-2 border-b border-s-zinc-200 fixed w-full z-10 top-0">
      <div className="container flex items-center justify-between">
        <Link href="/">
          <Shell />
        </Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link className="h-10 px-4 py-2" href="/sign-in">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
export default Navbar;
