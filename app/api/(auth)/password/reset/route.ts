import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';
import { withAuth,AuthenticatedRequest } from "@/lib/(middlewares)/authMiddleWare";

const prisma = new PrismaClient();

async function handlePasswordReset(req: AuthenticatedRequest) {
  try {
    const { password } = await req.json();
    
    if (!req.user || !req.user.sub) {
      return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.sub },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ response: "User password changed successfully" }, { status: 200 });
  } catch (error) {
    console.error('Error in password reset:', error);
    return NextResponse.json({ error: 'Failed to reset password' }, { status: 500 });
  }
}

export const PUT = withAuth(handlePasswordReset);