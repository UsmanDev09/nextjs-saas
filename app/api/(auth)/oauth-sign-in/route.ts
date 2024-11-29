import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import UserStatus from '@/app/(enums)/userStatus.enum';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { provider, email, name } = await req.json();
    if (!email) {
      console.error('Email is required');
      return NextResponse.json(
        {
          error: 'Email is required',
          details: 'No email provided in OAuth sign-in request',
        },
        { status: 400 }
      );
    }
    const allowedProviders = ['google', 'facebook', 'linkedin'];
    if (!provider || !allowedProviders.includes(provider.toLowerCase())) {
      console.error('Invalid OAuth provider', { provider });
      return NextResponse.json(
        {
          error: 'Invalid OAuth provider',
          details: `Provider ${provider} is not allowed`,
        },
        { status: 403 }
      );
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        status: true,
        oauth_provider: true,
      },
    });
    if (existingUser && existingUser.status !== UserStatus.Active) {
      console.error('User account is not active', {
        userId: existingUser.id,
        status: existingUser.status,
      });
      return NextResponse.json(
        {
          error: 'Access Denied',
          details: 'Your account is not active',
        },
        { status: 403 }
      );
    }

    if (!existingUser) {
      let username =
        email.split('@')[0] || name?.replace(/\s+/g, '').toLowerCase();
      const usernameCount = await prisma.user.count({
        where: { username: { startsWith: username } },
      });

      if (usernameCount > 0) {
        username = `${username}${usernameCount}`;
      }
      try {
        const newUser = await prisma.user.create({
          data: {
            email,
            username,
            name,
            oauth_provider: provider,
            status: UserStatus.Active,
            emailVerified: new Date(),
          },
        });

        return NextResponse.json(
          {
            message: 'User created successfully via OAuth',
            newUser: true,
            user: {
              id: newUser.id,
              email: newUser.email,
              username: newUser.username,
              name: newUser.name,
            },
          },
          { status: 201 }
        );
      } catch (createError) {
        console.error('Error creating new user', createError);
        return NextResponse.json(
          {
            error: 'Failed to create user',
            details:
              createError instanceof Error
                ? createError.message
                : 'Unknown error',
          },
          { status: 500 }
        );
      }
    }
    try {
      const updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          oauth_provider: provider,
          last_login: new Date(),
        },
      });

      return NextResponse.json(
        {
          message: 'User signed in successfully via OAuth',
          newUser: false,
          user: {
            id: updatedUser.id,
            email: updatedUser.email,
            username: updatedUser.username,
            name: updatedUser.name,
            status: updatedUser.status,
          },
        },
        { status: 200 }
      );
    } catch (updateError) {
      console.error('Error updating existing user', updateError);
      return NextResponse.json(
        {
          error: 'Failed to update user',
          details:
            updateError instanceof Error
              ? updateError.message
              : 'Unknown error',
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Critical error during OAuth sign-in:', error);
    return NextResponse.json(
      {
        error: 'Something went wrong during OAuth authentication',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
