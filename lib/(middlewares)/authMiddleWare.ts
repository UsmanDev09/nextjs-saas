import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export interface AuthenticatedRequest extends NextRequest {
  user?: jwt.JwtPayload;
}

export function withAuth<
  T extends(req: AuthenticatedRequest) => Promise<NextResponse>,
>(handler: T): (req: NextRequest) => Promise<NextResponse> {
  return async (req: NextRequest) => {
    try {
      const token = req.headers.get('authorization')?.split(' ')[1];
      if (!token) {
        return NextResponse.json(
          { error: 'Unauthorized: No token provided' },
          { status: 401 },
        );
      }

      const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

      const authenticatedReq = req as AuthenticatedRequest;
      authenticatedReq.user = decoded;

      return handler(authenticatedReq);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return NextResponse.json(
          { error: 'Unauthorized: Invalid token' },
          { status: 401 },
        );
      }
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 },
      );
    }
  };
}
