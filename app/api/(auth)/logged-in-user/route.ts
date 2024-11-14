import {
  AuthenticatedRequest,
  withAuth,
} from '@/lib/(middlewares)/authMiddleWare';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function getLoggedInUser(req: AuthenticatedRequest) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: req.user?.sub },
    });
    if (!foundUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = foundUser;
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to get user: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 },
    );
  }
}
export const GET = withAuth(getLoggedInUser);
