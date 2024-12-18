import {
  AuthenticatedRequest,
  withAuth,
} from '@/lib/(middlewares)/authMiddleWare';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

async function updateProfilePassword(req: AuthenticatedRequest) {
  try {
    const userId = req.user?.sub;
    const body = await req.json();
    const { password } = body;
    if (!userId) {
      return NextResponse.json(
        { error: 'User not authenticated' },
        { status: 401 }
      );
    }
    const userProfile = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userProfile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });
    return NextResponse.json({
      message: 'Password changed successfully',
      updatedProfile,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failure to change password: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    );
  }
}
export const PATCH = withAuth(updateProfilePassword);
