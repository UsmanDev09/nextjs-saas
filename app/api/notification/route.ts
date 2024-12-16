import {
  AuthenticatedRequest,
  withAuth,
} from '@/lib/(middlewares)/authMiddleWare';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

async function createNotification(req: Request) {
  try {
    const notificationRequest = await req.json();
    const notification = await prisma.notification.create({
      data: {
        notificationTypeId: notificationRequest.notificationTypeId,
        userId: notificationRequest.userId,
        notificationMessage: notificationRequest.notificationMessage,
      },
    });
    return NextResponse.json({
      message: 'Notification generated',
      notification,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `${error.message}` }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

async function getNotifications(req: AuthenticatedRequest) {
  const userId = req.user!.sub;
  if (!userId) {
    return NextResponse.json(
      { message: 'User not authenticated' },
      { status: 401 }
    );
  }
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userAction: 'unread',
        userId,
      },
    });
    return NextResponse.json({
      notifications,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `${error.message}` }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export const POST = withAuth(createNotification);

export const GET = withAuth(getNotifications);
