import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient
export async function POST(req:Request){
    try {
        const notificationRequest = await req.json();
        const systemNotification = await prisma.notification.create({
            data:{
                notificationTypeId:notificationRequest.notification_type_id,
                userId: notificationRequest.user_id,
                notificationMessage: notificationRequest.notification_message,
            }
        })
        return NextResponse.json({message:"System notification generated",systemNotification});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error},{status:400});
    }
}