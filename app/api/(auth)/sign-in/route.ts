import { createJwtTokenPair } from '@/app/services/authServices';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

// const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Replace with your actual secret

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password || '');

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const { accessToken, refreshToken } = await createJwtTokenPair(user);
    return NextResponse.json({
      message: 'Signed in successfully',
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error during sign-in:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
