import UserStatus from '@/app/(enums)/userStatus.enum';
import VerificationTokenType from '@/app/(enums)/verificationTokenType.enum';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';
import { sendVerificationEmail,sendForgotPasswordEmail } from '@/app/services/mailerService';
import { sendVerifyEmail, verifyEmail } from '@/app/services/authServices';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    // Create a username based on the email
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
          user_profiles: {
            create: {
              energy: 3,
            },
          },
          user_progress: {
            create: {},
          },
        },
        include: {
          user_profiles: true,
          user_progress: true,
        },
      });

    await sendVerifyEmail(user.id);

    return NextResponse.json({ message: 'User created successfully. Please check your email to verify.' }, { status: 201 });
  } catch (error) {
    console.error('Error during sign-up:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}