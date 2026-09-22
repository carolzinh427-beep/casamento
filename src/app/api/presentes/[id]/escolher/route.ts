import { NextRequest, NextResponse } from 'next/server';
import { escolherPresente } from '@/lib/db';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const resolvedParams = await Promise.resolve(context.params);
    const { id } = resolvedParams;
    const body = await req.json();
    const { nome, mensagem } = body;

    if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
      return NextResponse.json({ error: 'Por favor, informe seu nome.' }, { status: 400 });
    }

    const updated = await escolherPresente(id, nome.trim(), mensagem?.trim());
    if (!updated) {
      return NextResponse.json({ error: 'Presente não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Presente escolhido com sucesso! Muito obrigado pelo carinho.',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao registrar presente.' }, { status: 500 });
  }
}
