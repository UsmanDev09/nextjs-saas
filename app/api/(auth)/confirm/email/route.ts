import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';
import { verifyEmail } from '@/app/services/authServices';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';
export async function POST(req: NextRequest) {
    try {
      const { userId, token } = await req.json();
  
      if (!userId || !token) {
        return NextResponse.json({ error: 'User ID and token are required' }, { status: 400 });
      }
  
      const decoded = jwt.verify(token, JWT_SECRET);
      if (!decoded) {
        return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
      }
      await verifyEmail(userId,token);
      
      return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
    } catch (error) {
      console.error('Error confirming email:', error);
      return NextResponse.json({ error: 'Failed to confirm email' }, { status: 500 });
    }
  }