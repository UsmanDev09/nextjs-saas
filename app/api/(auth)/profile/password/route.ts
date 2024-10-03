import { AuthenticatedRequest, withAuth } from "@/lib/(middlewares)/authMiddleWare";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient
async function updateProfilePassword(req:AuthenticatedRequest){
    try {
        const userId = req.user?.sub
        const body = await req.json()
        const { password } = body
        if(!userId){
            return NextResponse.json({error:"User not authenticated"},{status:401})
        }
        const userProfile = await prisma.user.findUnique({
            where:{id:userId}
        })
        if(!userProfile){
            return NextResponse.json({error:"User not found"},{status:404})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedProfile = await prisma.user.update({
            where: { id: userId },
            data: {
                password:hashedPassword
            }
        })
        return NextResponse.json({
            message:"Password changed successfully",
            updatedProfile,
        });
    } catch (error) {
        console.error('Error changing user password:', error);
        return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
    }
}
export const PATCH = withAuth(updateProfilePassword);