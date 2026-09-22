import { NextResponse } from 'next/server';
import { getRsvps } from '@/lib/db';

export async function GET() {
  try {
    const list = await getRsvps();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar confirmações de presença' },
      { status: 500 }
    );
  }
}
