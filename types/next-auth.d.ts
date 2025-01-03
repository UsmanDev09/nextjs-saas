import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name:string;
      username: string;
      email: string;
      status: string;
      sub: string;
      role?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    username: string;
    status: string;
    sub: string;
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    status: string;
    sub: string;
    role?: string;
  }
}
