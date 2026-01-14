import { NextResponse } from 'next/server';
import { getAuthData, updateAuthData, getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();
    const authData = await getAuthData();

    if (currentPassword !== authData.password) {
      return NextResponse.json(
        { error: 'Mật khẩu hiện tại không đúng' },
        { status: 400 }
      );
    }

    authData.password = newPassword;
    await updateAuthData(authData);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra' },
      { status: 500 }
    );
  }
}
