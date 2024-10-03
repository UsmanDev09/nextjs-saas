import NotificationTypeEnum from "@/app/(enums)/notificationType.enum";
import UserStatus from "@/app/(enums)/userStatus.enum";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient;
export async function POST(req:Request){
    try {
        
        const notificationRequest = await req.json();
        const friend = await prisma.user.findUnique({
            where:{
                id:notificationRequest.from_user_id,
                status: UserStatus.Active
            }
        })
        if(!friend){
            return NextResponse.json("Friend not found");
        }
        await prisma.notification.create({
            data:{
                notificationTypeId: NotificationTypeEnum.GameRequest,
                userId: notificationRequest.user_id,
                fromUserId: notificationRequest.from_user_id,
                notificationMessage: `Game request from ${friend.username}`,
            }
        })
        return NextResponse.json('Game request sent successfully');
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error},{status:400});
    }
}