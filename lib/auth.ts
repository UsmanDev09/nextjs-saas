import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import LinkedInProvider from 'next-auth/providers/linkedin';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.AUTH_LINKEDIN_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET!,
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
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!response.ok) {
            return null;
          }
          const existingUser = await response.json();
          if (existingUser) {
            return {
              id: `${existingUser.id}`,
              sub: existingUser.id,
              username: existingUser.username,
              name: existingUser.name,
              email: existingUser.email,
              status: existingUser.status,
            };
          }
          return null;
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      console.log('inside sign in');
      try {
        const allowedProviders = [
          'google',
          'facebook',
          'linkedin',
          'credentials',
        ];
        if (
          !account?.provider
          || !allowedProviders.includes(account.provider)
        ) {
          console.error('Unauthorized provider:', account?.provider);
          return false;
        }
        if (account.provider !== 'credentials') {
          console.log('before the oauth api');
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/oauth-sign-in`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                provider: account.provider,
                email: profile?.email,
                name: profile?.name,
              }),
            },
          );
          if (!response.ok) {
            const errorBody = await response.text();
            console.error('Backend OAuth verification failed:', {
              status: response.status,
              body: errorBody,
            });
            return false;
          }

          return true;
        }

        return true;
      } catch (error) {
        console.error('Sign-in error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          status: user.status,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          sub: token.sub,
          status: token.status,
        },
      };
    },
  },
};

export default NextAuth(authOptions);
