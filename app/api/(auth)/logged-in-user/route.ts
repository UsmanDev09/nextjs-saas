import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import {
  AuthenticatedRequest,
  withAuth,
} from '@/lib/(middlewares)/authMiddleWare';

const prisma = new PrismaClient();
async function getLoggedInUser(req: AuthenticatedRequest) {
  try {
    const foundUser = await prisma.user.findUnique({
      where: { id: req.user?.sub },
    });
    if (!foundUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const { password, ...user } = foundUser;
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error in getting user:', error);
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}
export const GET = withAuth(getLoggedInUser);
