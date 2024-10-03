import NotificationTypeEnum from '@/app/(enums)/notificationType.enum';
import UserStatus from '@/app/(enums)/userStatus.enum';
import { AuthenticatedRequest, withAuth } from '@/lib/(middlewares)/authMiddleWare';
import NotificationTemplates from '@/lib/utils';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
// import { NotificationTypeEnum, NotificationTemplates } from '../notifications';
// import notificationService from '../services/notificationService';

const prisma = new PrismaClient();

async function sendFriendRequest(req:AuthenticatedRequest){
    const userId = req.user!.sub;
    const friendid = req.nextUrl.pathname.split('/').pop();
    if(!userId){
        return NextResponse.json({message:"User is not authenticated"},{status:401})
    }
    if(!friendid){
        return NextResponse.json({message:"No friend id"});
    }
  try {
    const friend = await prisma.user.findFirst({
      where: {
        AND: [
          { id: friendid },
          { id: { not: userId } },
          { status: UserStatus.Active }  
        ]
      }
    });

    if (!friend) {
      return NextResponse.json({message:'Friend not found or inactive'});
    }

    const existingFriendship = await prisma.usersToFriends.findFirst({
      where: {
        userId: userId,
        friendId: friendid,
      },
    });

    if (!existingFriendship) {
      // Transaction to create friendship both ways
      await prisma.$transaction(async (tx) => {
        await tx.usersToFriends.createMany({
          data: [
            { userId, friendId:friendid, initiatorId: userId },
            { userId: friendid, friendId: userId, initiatorId: userId },
          ],
        });
      });

      // Send notification for the friend request
      await prisma.notification.create({
        data:{
          notificationTypeId: NotificationTypeEnum.FriendRequest,
          userId: friendid,
          fromUserId: userId,
          notificationMessage: NotificationTemplates.FriendRequest({ name: friend.name }),
        }
      });
    }

    return NextResponse.json({ message: 'Friend request sent successfully' },{status:200});
  } catch (error) {
    return NextResponse.json(error);
  }
};
export const POST = withAuth(sendFriendRequest);