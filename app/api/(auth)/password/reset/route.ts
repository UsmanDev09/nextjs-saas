import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function PUT(req: NextRequest) {
  try {
    const { token, password } = await req.json();
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const userId = await prisma.verificationToken.findFirst({
      where: { token },
    });

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId.identifier },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json(
      { response: 'User password changed successfully' },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to reset password: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 },
    );
  }
}
