import { NextResponse } from 'next/server';
import { getFotos } from '@/lib/db';

export async function GET() {
  try {
    const data = await getFotos();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter fotos' }, { status: 500 });
  }
}
