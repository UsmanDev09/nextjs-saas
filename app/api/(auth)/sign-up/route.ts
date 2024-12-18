import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import authorizationService from '@/app/services/authServices';
import notificationService from '@/app/services/notificationService';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 422 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 },
      );
    }

    let username = email.split('@')[0];
    const usernameCount = await prisma.user.count({
      where: { username: { startsWith: username } },
    });

    if (usernameCount > 0) {
      username = `${username}${usernameCount}`;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
        userProfiles: {
          create: {},
        },
      },
      select: {
        id: true,
        email: true,
        username: true,
        name: true,
        status: true,
      },
    });

    await authorizationService.sendVerifyEmail(user.id);

    const notification = await prisma.notificationType.findUnique({
      where: { notificationName: 'User Signup Notification' },
    });

    if (notification) {
      await notificationService.createNotification({
        userId: user.id,
        notificationMessage: 'Congratulations! You have signed up.',
        notificationTypeId: notification.id,
      });
    }

    return NextResponse.json(
      {
        message:
          'User created successfully. Please check your email to verify.',
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Error signing up: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ error: 'Error signing up' }, { status: 500 });
  }
}
