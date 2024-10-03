import { AuthenticatedRequest, withAuth } from "@/lib/(middlewares)/authMiddleWare";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;
async function getUserFriends(req:AuthenticatedRequest){
    try {
        const userId = req.user!.sub;
        if(!userId){
            return NextResponse.json({message:"User not authenticated"},{status:401});
        }
        const userfriends = prisma.usersToFriends.findMany({
            where:{userId}
        })
        return NextResponse.json(userfriends);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error},{status:400});
    }
}
export const GET = withAuth(getUserFriends)