import { NextResponse } from 'next/server';
import { getAuthData, createToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const authData = await getAuthData();

    if (username === authData.username && password === authData.password) {
      const token = await createToken({ username });
      const cookieStore = await cookies();
      
      cookieStore.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 2, // 2 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Tên đăng nhập hoặc mật khẩu không đúng' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra' },
      { status: 500 }
    );
  }
}
