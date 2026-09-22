import { NextRequest, NextResponse } from 'next/server';
import { updateEvento } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    const body = await req.json();
    const updated = await updateEvento(id, body);
    if (!updated) {
      return NextResponse.json({ error: 'Evento não encontrado' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar evento' }, { status: 500 });
  }
}
