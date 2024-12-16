import { AuthenticatedRequest, withAuth } from '@/lib/(middlewares)/authMiddleWare';
import { NextResponse } from 'next/server';

async function readNotification(
  req: AuthenticatedRequest,
) {
  const userId = req.user!.sub;
  const request = await req.json();

  if (!userId) {
    return NextResponse.json(
      { message: 'User not authenticated' },
      { status: 401 },
    );
  }
  try {
    const notifications = await prisma.notification.update({
      where: {
        id: request.notificationId,
        userId,
      },
      userAction: 'read',
    });

    return NextResponse.json({
      notifications,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 },
    );
  }
}

export const PUT = withAuth(readNotification);
