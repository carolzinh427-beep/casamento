import { NextResponse } from 'next/server';
import { getEventos } from '@/lib/db';

export async function GET() {
  try {
    const data = await getEventos();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter eventos' }, { status: 500 });
  }
}
