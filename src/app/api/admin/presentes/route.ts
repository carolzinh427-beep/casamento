import { NextRequest, NextResponse } from 'next/server';
import { getPresentes, createPresente } from '@/lib/db';

export async function GET() {
  try {
    const list = await getPresentes();
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar lista de presentes' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, categoria, descricao, imagem, valor } = body;

    if (!nome || !valor) {
      return NextResponse.json(
        { error: 'Nome e valor do presente são obrigatórios.' },
        { status: 400 }
      );
    }

    const created = await createPresente({
      nome: nome.trim(),
      categoria: categoria?.trim() || 'Geral',
      descricao: descricao?.trim() || '',
      imagem: imagem?.trim() || '/images/presentes/padrao.jpg',
      valor: parseFloat(valor),
    });

    return NextResponse.json({ success: true, data: created });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar presente.' }, { status: 500 });
  }
}
