import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
  return <div>{children}</div>;
}

export default AuthLayout;
