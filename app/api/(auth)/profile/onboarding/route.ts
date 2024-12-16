import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import {
  AuthenticatedRequest,
  withAuth,
} from '@/lib/(middlewares)/authMiddleWare';
import UserStatus from '@/app/(enums)/userStatus.enum';

async function profileOnboarding(req: AuthenticatedRequest) {
  const userId = req.user!.sub;

  const onboardingRequestData = await req.json();

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { usersSoftSkills: true },
    });

    if (!user) throw new Error('User not found');

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: 'Please verify your email before continuing with onboarding' },
        { status: 403 },
      );
    }

    if (user.status === UserStatus.Active) {
      return NextResponse.json(
        { error: 'Onboarding has already been completed' },
        { status: 403 },
      );
    }

    const softSkillNames = onboardingRequestData.softSkills ?? [];

    const softSkills = await prisma.softSkill.findMany({
      where: {
        name: { in: softSkillNames },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const softSkillIds = softSkills.map((skill) => skill.id);

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: onboardingRequestData.name,
        usersSoftSkills: {
          deleteMany: {},
          createMany: {
            data: softSkillIds.map((id) => ({
              softSkillId: id,
            })),
          },
        },
        userProfiles: {
          upsert: {
            create: {
              age: onboardingRequestData.age,
              gender: onboardingRequestData.gender,
              profileType: onboardingRequestData.profileType,
            },
            update: {
              age: onboardingRequestData.age,
              gender: onboardingRequestData.gender,
              profileType: onboardingRequestData.profileType,
            },
          },
        },
      },
    });

    const result = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (result) {
      await prisma.user.update({
        where: { id: userId },
        data: { status: 'active' },
      });
    }

    return NextResponse.json([]);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 },
    );
  }
}

export const PUT = withAuth(profileOnboarding);
