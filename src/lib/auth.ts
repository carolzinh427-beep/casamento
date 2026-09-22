import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'casamento_amanda_e_hugo_super_secret_token_key_2026'
);

export const COOKIE_NAME = 'admin_session';

export interface AdminSessionPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export async function createSessionToken(username: string): Promise<string> {
  return await new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function isAuthenticated(req?: NextRequest): Promise<boolean> {
  try {
    let token: string | undefined;

    if (req) {
      token = req.cookies.get(COOKIE_NAME)?.value;
    } else {
      const cookieStore = await cookies();
      token = cookieStore.get(COOKIE_NAME)?.value;
    }

    if (!token) return false;
    const session = await verifySessionToken(token);
    return session !== null && session.role === 'admin';
  } catch {
    return false;
  }
}

export function validateAdminCredentials(username: string, password: string):boolean {
  const envUsername = process.env.ADMIN_USERNAME || 'Casamento';
  const envPassword = process.env.ADMIN_PASSWORD || 'Amandaehugo';

  return username === envUsername && password === envPassword;
}
