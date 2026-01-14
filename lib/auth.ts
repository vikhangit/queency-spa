import fs from 'fs/promises';
import path from 'path';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const AUTH_PATH = path.join(process.cwd(), 'data', 'auth.json');
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'queency-spa-secret-key-12345');

export async function getAuthData() {
  try {
    const fileContent = await fs.readFile(AUTH_PATH, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return { username: 'adminqueency', password: '12345' };
  }
}

export async function updateAuthData(newData: any) {
  await fs.writeFile(AUTH_PATH, JSON.stringify(newData, null, 2), 'utf-8');
  return newData;
}

export async function createToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  if (!token) return null;
  return await verifyToken(token);
}
