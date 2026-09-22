import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'casamento_amanda_e_hugo_super_secret_token_key_2026'
);

const COOKIE_NAME = 'admin_session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Proteger APIs administrativas (/api/admin/*)
  if (pathname.startsWith('/api/admin')) {
    // Permitir rota de login da API
    if (pathname === '/api/admin/auth/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get(COOKIE_NAME)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: 'Sessão inválida ou expirada' }, { status: 401 });
    }
  }

  // 2. Proteger páginas do painel (/admin/*)
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login';
    const token = request.cookies.get(COOKIE_NAME)?.value;

    let isValid = false;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        isValid = true;
      } catch {
        isValid = false;
      }
    }

    // Se já estiver logado e tentar acessar /admin/login, manda para /admin
    if (isLoginPage && isValid) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }

    // Se não estiver logado e tentar acessar qualquer página de admin exceto o login
    if (!isLoginPage && !isValid) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
