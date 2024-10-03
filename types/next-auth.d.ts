import NextAuth from "next-auth"

declare module "next-auth" {
    interface User{
        username:string,
        status:string
    }
  interface Session {
    user: User & {
        username: string,
        status:string,
    }
    token:{
        username:string
    }
  }
}