import type { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { toast } from 'react-toastify';
import GoogleProvider from 'next-auth/providers/google';

console.log('RRR');
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'john@email.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          console.log('REACHED HERE');
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user || !user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            sub: user.id,
            username: user.username,
            name: user.name,
            email: user.email,
            status: user.status,
          };
        } catch (error: unknown) {
          if (error instanceof Error) toast.error(error.message);
          else toast.error('Failed to sign in');
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('token', token, user, account);

      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          status: user.status,
          sub: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log('SESSION');
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          username: token.username as string,
          sub: token.sub as string,
          status: token.status as string,
        },
      };
    },
  },
};
