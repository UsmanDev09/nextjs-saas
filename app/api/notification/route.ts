import { AuthenticatedRequest, withAuth } from "@/lib/(middlewares)/authMiddleWare";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient
export async function POST(req:NextRequest){
    try {
        const body = await req.text();
        const notificationRequest = JSON.parse(body);
        if(!notificationRequest){
            return NextResponse.json({message:"Notification body is required"});
        }
        const isoDate = new Date(notificationRequest.expiry_date).toISOString();
        const newNotification = await prisma.notification.create({
            data:{
                notificationTypeId:notificationRequest.notification_type_id,
                userId:notificationRequest.user_id,
                fromUserId:notificationRequest.from_user_id,
                notificationMessage:notificationRequest.notification_message,
                notificationLink:notificationRequest.notification_link,
                expiryDate:isoDate
            }
        });
        return NextResponse.json({message:"Notification created successfully",notification:newNotification})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error},{status:400});
    }

}
async function getNotifications(req:AuthenticatedRequest,page:number = 1,limit:number = 10){
    const userId = req.user!.sub;
    if(!userId){
        return NextResponse.json({message:"User not authenticated"},{status:401});
    }
    try {
        const unreadCount = await prisma.notification.count({
            where:{
                userAction:'unread',
                userId
            }
        })
        return NextResponse.json({todays:await getTodayNotifications(userId),others:await getOldNotifications(userId,page,limit),unreadCount});
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:error},{status:400});
    }
}
export const getTodayNotifications = async (userId: string) => {
  const today = new Date();
  const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  const notifications = await prisma.notification.findMany({
    where: {
      userId: userId,
      userAction: { not: 'deleted' },
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
    include: {
      notificationType: true, 
      fromUser: { 
        include: {
          files: true, 
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    total: notifications.length,
    data: notifications,
  };
};


  export const getOldNotifications = async (userId: string, page: number, limit: number) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
    const [total, notifications] = await prisma.$transaction([
      prisma.notification.count({
        where: {
          userId,
          userAction: { not: 'deleted' },
          createdAt: { lte: startOfDay },
        },
      }),
      prisma.notification.findMany({
        where: {
          userId,
          userAction: { not: 'deleted' },
          createdAt: { lte: startOfDay },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          notificationType: true,
        //   user_notification_groups: true,
          fromUser: {
            include: {
              files: true,
            },
          },
        },
      }),
    ]);
  
    return {
      data: notifications,
      total: total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  };

export const GET = withAuth(getNotifications);