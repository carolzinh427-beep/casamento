import { NextRequest, NextResponse } from 'next/server';
import { getRecados, createRecado } from '@/lib/db';

export async function GET() {
  try {
    // Retorna estritamente recados aprovados para o site público
    const approved = await getRecados(true);
    return NextResponse.json(approved);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar recados' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, mensagem, hp } = body;

    if (hp) {
      return NextResponse.json({ success: true, message: 'Recado enviado com sucesso!' });
    }

    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json({ error: 'Por favor, informe seu nome.' }, { status: 400 });
    }

    if (!mensagem || typeof mensagem !== 'string' || mensagem.trim().length < 3) {
      return NextResponse.json(
        { error: 'Por favor, escreva uma mensagem de carinho para o casal.' },
        { status: 400 }
      );
    }

    if (mensagem.length > 800) {
      return NextResponse.json(
        { error: 'A mensagem não pode ultrapassar 800 caracteres.' },
        { status: 400 }
      );
    }

    const saved = await createRecado(nome.trim(), mensagem.trim());

    return NextResponse.json({
      success: true,
      data: saved,
      message: 'Seu recado foi enviado com carinho e aparecerá no mural logo após a aprovação dos noivos!',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao enviar recado.' }, { status: 500 });
  }
}
