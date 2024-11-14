import {
  AuthenticatedRequest,
  withAuth,
} from '@/lib/(middlewares)/authMiddleWare';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

async function getUserProfile(req: AuthenticatedRequest) {
  try {
    const userProfile = await prisma.profile.findUnique({
      where: { userId: req.user?.sub },
    });
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User Profile not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({ userProfile }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failure to reset password: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 },
    );
  }
}

async function updateUserProfile(req: AuthenticatedRequest) {
  if (!req.user || !req.user.sub) {
    return NextResponse.json(
      { error: 'User not authenticated' },
      { status: 401 },
    );
  }

  const userId = req.user.sub;
  const requestData = await req.json();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const userUpdateData: { name?: string; username?: string } = {};
      if (requestData.name) userUpdateData.name = requestData.name;
      if (requestData.username) userUpdateData.username = requestData.username;

      if (Object.keys(userUpdateData).length > 0) {
        await tx.user.update({
          where: { id: userId },
          data: userUpdateData,
        });
      }
      const profile = await tx.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new Error('User profile not found');
      }
      const { age, gender, phoneNumber } = requestData;
      const updatedProfile = await tx.profile.update({
        where: { userId },
        data: {
          age,
          gender,
          phoneNumber,
        },
      });

      return updatedProfile;
    });

    return NextResponse.json(
      { message: 'Profile updated successfully', profile: result },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failure to update profile: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 },
    );
  }
}

export const GET = withAuth(getUserProfile);
export const PATCH = withAuth(updateUserProfile);
