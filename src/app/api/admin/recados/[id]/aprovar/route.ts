import { NextRequest, NextResponse } from 'next/server';
import { aprovarRecado } from '@/lib/db';

export async function PUT(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    const updated = await aprovarRecado(id);

    if (!updated) {
      return NextResponse.json({ error: 'Recado não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao aprovar recado.' }, { status: 500 });
  }
}
