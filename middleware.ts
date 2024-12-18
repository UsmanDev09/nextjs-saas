import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function validateEmail(email: string) {
  return email && email.includes('@');
}

function validateConfirmEmailCode(code: string) {
  return code && code.length >= 4;
}

function validateToken(token: string) {
  return token && token.length >= 5;
}

function validatePassword(password: string) {
  return password && password.length >= 5;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    [
      '/api/sign-up',
      '/api/sign-in',
      '/api/confirm/email',
      '/api/forgot-password',
      '/api/reset-password',
    ].includes(pathname)
  ) {
    const body = await request.json();
    const checkExtraFields = (allowedFields: string[]) => {
      const extraFields = Object.keys(body).filter(
        (field) => !allowedFields.includes(field),
      );
      if (extraFields.length > 0) {
        return NextResponse.json(
          {
            errors: [{ msg: `Unexpected field(s): ${extraFields.join(', ')}` }],
          },
          { status: 400 },
        );
      }
      return null;
    };

    switch (pathname) {
      case '/api/sign-up': {
        const { email, password, confirmPassword } = body;
        const extraFieldsResponse = checkExtraFields([
          'email',
          'password',
          'confirmPassword',
        ]);
        if (extraFieldsResponse) return extraFieldsResponse;

        if (!validateEmail(email)) {
          return NextResponse.json(
            { error: 'Invalid email format' },
            { status: 400 },
          );
        }

        if (!password || password.length < 8) {
          return NextResponse.json(
            { error: 'Password must be at least 8 characters long' },
            { status: 400 },
          );
        }

        if (password !== confirmPassword) {
          return NextResponse.json(
            { error: 'Passwords do not match' },
            { status: 400 },
          );
        }
        break;
      }
      case '/api/sign-in': {
        const { email, password } = body;
        const extraFieldsResponse = checkExtraFields(['email', 'password']);
        if (extraFieldsResponse) return extraFieldsResponse;

        if (!email || !password) {
          return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 },
          );
        }

        if (!validateEmail(email)) {
          return NextResponse.json(
            { error: 'Invalid email format' },
            { status: 400 },
          );
        }
        break;
      }
      case '/api/confirm/email': {
        const { userId, token } = body;
        const extraFieldsResponse = checkExtraFields(['userId', 'token']);
        if (extraFieldsResponse) return extraFieldsResponse;

        if (!validateConfirmEmailCode(token)) {
          return NextResponse.json(
            {
              errors: [{ msg: 'Code must be at least 5 characters long.' }],
            },
            { status: 400 },
          );
        }
        break;
      }
      case '/api/password/forgot': {
        const { email } = body;
        const extraFieldsResponse = checkExtraFields(['email']);
        if (extraFieldsResponse) return extraFieldsResponse;

        if (!validateEmail(email)) {
          return NextResponse.json(
            { error: 'Invalid email format' },
            { status: 400 },
          );
        }
        break;
      }
      case '/api/password/reset': {
        const { token, password } = body;
        const extraFieldsResponse = checkExtraFields(['token', 'password']);
        if (extraFieldsResponse) return extraFieldsResponse;

        if (!validateToken(token)) {
          return NextResponse.json(
            {
              errors: [{ msg: 'Token must be at least 5 characters long.' }],
            },
            { status: 400 },
          );
        }
        if (!validatePassword(password)) {
          return NextResponse.json(
            {
              errors: [{ msg: 'Password must be at least 5 characters long.' }],
            },
            { status: 400 },
          );
        }
        break;
      }
      default:
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/sign-up',
    '/api/sign-in',
    '/api/confirm/email',
    '/api/password/forgot',
    '/api/password/reset',
  ],
};
