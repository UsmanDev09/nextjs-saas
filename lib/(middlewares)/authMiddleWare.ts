import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    sub: string;
    email: string;
    role: string;
  };
}

export function withAuth(
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest) => {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session.user.sub) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const authenticatedRequest = req as AuthenticatedRequest;
    authenticatedRequest.user = {
      sub: session.user.sub as string,
      email: session.user.email as string,
      role: session.user.role as string,
    };

    return handler(authenticatedRequest);
  };
}
