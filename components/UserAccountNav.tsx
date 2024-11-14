'use client';

import { signOut } from 'next-auth/react';

function UserAccountNav() {
  return (
    <button
      type="button"
      onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/sign-in`,
      })}
      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
    >
      Sign Out
    </button>
  );
}

export default UserAccountNav;
