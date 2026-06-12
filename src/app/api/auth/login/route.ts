import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_CREDENTIALS } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (
      email === ADMIN_CREDENTIALS.email &&
      password === ADMIN_CREDENTIALS.password
    ) {
      const cookieStore = await cookies();
      cookieStore.set('ridldi_session', 'authenticated_admin_session_token_xyz', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2, // 2 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred during sign in' }, { status: 500 });
  }
}
