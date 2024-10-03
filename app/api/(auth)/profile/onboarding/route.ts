import { NextRequest, NextResponse } from "next/server";
import { PrismaClient, Profile, User, UsersToSkills } from "@prisma/client";
import { AuthenticatedRequest, withAuth } from "@/lib/(middlewares)/authMiddleWare";
import UserStatus from "@/app/(enums)/userStatus.enum";
import { OnboardingRequest, OnboardingResponse } from "@/lib/utils";

const prisma = new PrismaClient();
type UserWithSkillsAndProfile = User & {
  users_soft_skills:UsersToSkills[];
  user_profiles: Profile | null;
};

async function findSoftSkillsByIds(ids: string[]) {
  if (ids.length) {
    return ids.map((id) => ({ softSkillId: id }));
  }
  return [];
}

async function profileOnboarding(req: NextRequest) {
  const authenticatedRequest = req as AuthenticatedRequest;
  const userId = authenticatedRequest.user!.sub;

  const onboardingRequestData = await req.json();
  const onboardingRequest = new OnboardingRequest(onboardingRequestData);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { users_soft_skills: true },
    });

    if (!user) throw new Error('User not found');

    if (user.status === UserStatus.Active || !user.emailVerified) {
      throw new Error(
        user.status === UserStatus.Active
          ? 'Onboarding already completed'
          : 'Email not verified'
      );
    }

    const usersToSkills = await findSoftSkillsByIds(onboardingRequest?.getFourthStep()?.softSkills ?? []);
    const data = onboardingRequest.getData(user.id, usersToSkills);

    await prisma.user.update({
      where: { id: userId },
      data: data,
    });

    const result = await prisma.user.findUnique({
      where: { id: userId },
    });

    const response = new OnboardingResponse(result);
    if (response.complete) {
      await prisma.user.update({ where: { id: userId }, data: { status: 'active' } });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error during onboarding:', error);
    return NextResponse.json({ message: error }, { status: 400 });
  }
}
export async function getOnboarding(req:AuthenticatedRequest): Promise<NextResponse> {
  const userId = req.user!.sub;
  if(!userId){
    return NextResponse.json({message:"User not authenticated"},{status:401});
  }
  const user = await getOneWithSkills(userId);
  const onboardingResponse = new OnboardingResponse(user);
  return NextResponse.json(onboardingResponse);
}

async function getOneWithSkills(id: string): Promise<UserWithSkillsAndProfile> {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      users_soft_skills: true,
      user_profiles: true,
    },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
export const PUT = withAuth(profileOnboarding);
export const GET = withAuth(getOnboarding);