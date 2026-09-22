import { NextRequest, NextResponse } from 'next/server';
import { getFotos, createFoto } from '@/lib/db';

export async function GET() {
  try {
    const list = await getFotos();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar fotos' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, legenda, principal } = body;

    if (!url || typeof url !== 'string') {
      return NextResponse.json({ error: 'URL da imagem é obrigatória' }, { status: 400 });
    }

    const created = await createFoto({ url, legenda, principal });
    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar foto' }, { status: 500 });
  }
}
