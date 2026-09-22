import { NextResponse } from 'next/server';
import { getRecados } from '@/lib/db';

export async function GET() {
  try {
    const list = await getRecados(false); // Retorna todos os recados para moderação
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar recados' }, { status: 500 });
  }
}
