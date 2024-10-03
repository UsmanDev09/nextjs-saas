import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authOptions: NextAuthOptions = {
    secret:process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in'
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
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "john@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign-in`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials:'include',
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    if (!response.ok) {
                        return null;
                    }
                    const existingUser = await response.json();
                    // console.log("existing user",existingUser);
                    if (existingUser) {
                        return {
                            id: `${existingUser.id}`,
                            sub:existingUser.id,
                            username:existingUser.username,
                            name: existingUser.name,
                            email: existingUser.email,
                            status:existingUser.status,
                        };
                    } else {
                        return null;
                    }
                } catch (error) {
                    console.error('Authentication error:', error);
                    return null;
                }
            }
        })
    ],
    callbacks:{
        // async signIn({ account, profile }) {
        //     console.log("Account:",account,"Profile",profile);
        //     if (account?.provider === "google") {
        //         return true;  
        //       }
        //       return true; 
        // },
       async jwt({token,user,account})
       {
        // console.log("jwt token",token);
        if (account && account.provider === "google") {
            token.provider = "google";
        }
        if(user)
        {
            return{
                ...token,
                username:user.username,
                status: user.status,
            }
        }
        return token
       },
       async session({session,user,token}){
        return{
            ...session,
            user:{
                ...session.user,
                username:token.username,
                sub:token.sub,
                status:token.status,
            }
        }
       }
    },
}

export default NextAuth(authOptions)