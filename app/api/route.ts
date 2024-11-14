import { withAuth } from '@/lib/(middlewares)/authMiddleWare';
import { NextResponse } from 'next/server';

async function checkAuth() {
  return NextResponse.json({ authenticated: true });
}

export const GET = withAuth(checkAuth);
