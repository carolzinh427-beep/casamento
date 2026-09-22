import { NextResponse } from 'next/server';
import { getCasamento } from '@/lib/db';

export async function GET() {
  try {
    const data = await getCasamento();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter dados do casamento' }, { status: 500 });
  }
}
