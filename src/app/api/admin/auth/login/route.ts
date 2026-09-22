import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, validateAdminCredentials, COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Usuário e senha são obrigatórios.' },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(username.trim(), password.trim());
    if (!isValid) {
      return NextResponse.json(
        { error: 'Credenciais de administrador inválidas.' },
        { status: 401 }
      );
    }

    const token = await createSessionToken(username.trim());

    const response = NextResponse.json({
      success: true,
      message: 'Login realizado com sucesso!',
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar autenticação.' },
      { status: 500 }
    );
  }
}
