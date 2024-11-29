import { NextResponse, NextRequest } from 'next/server';
import authorizationService from '@/app/services/authServices';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID and token are required' },
        { status: 400 }
      );
    }
    await authorizationService.sendVerifyEmail(userId);

    return NextResponse.json(
      { message: 'Email re-sent successfully' },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to send email: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
