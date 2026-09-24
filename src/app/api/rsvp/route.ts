import { NextRequest, NextResponse } from 'next/server';
import { createRsvp } from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      nome,
      email,
      telefone,
      presente,
      adultos,
      criancas,
      acompanhante,
      observacoes,
      hp, // Honeypot anti-spam
    } = body;

    // Se o campo invisível honeypot estiver preenchido, rejeitar silenciosamente
    if (hp) {
      return NextResponse.json({ success: true, message: 'Confirmação recebida com sucesso!' });
    }

    if (!nome || typeof nome !== 'string' || nome.trim().length < 2) {
      return NextResponse.json(
        { error: 'Por favor, informe seu nome completo.' },
        { status: 400 }
      );
    }

    // E-mail é opcional: valida formato apenas se foi preenchido
    const emailStr = typeof email === 'string' ? email.trim() : '';
    if (emailStr !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr)) {
      return NextResponse.json(
        { error: 'Por favor, informe um endereço de e-mail válido ou deixe em branco.' },
        { status: 400 }
      );
    }

    if (!telefone || typeof telefone !== 'string' || telefone.trim().length < 8) {
      return NextResponse.json(
        { error: 'Por favor, informe um telefone de contato válido.' },
        { status: 400 }
      );
    }

    const isConfirmed = presente !== false && presente !== 'false';
    const numAdultos = Math.max(1, parseInt(adultos, 10) || 1);
    const numCriancas = Math.max(0, parseInt(criancas, 10) || 0);

    const saved = await createRsvp({
      nome: nome.trim(),
      email: emailStr ? emailStr.toLowerCase() : '',
      telefone: telefone.trim(),
      presente: isConfirmed,
      adultos: isConfirmed ? numAdultos : 0,
      criancas: isConfirmed ? numCriancas : 0,
      acompanhante: acompanhante ? String(acompanhante).trim() : '',
      observacoes: observacoes ? String(observacoes).trim() : '',
    });

    return NextResponse.json({
      success: true,
      data: saved,
      message: isConfirmed
        ? 'Sua presença foi confirmada com sucesso! Mal podemos esperar para comemorar com você.'
        : 'Agradecemos por nos avisar. Sentiremos sua falta nesse dia tão especial!',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar confirmação de presença.' },
      { status: 500 }
    );
  }
}
