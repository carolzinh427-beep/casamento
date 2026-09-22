import { NextRequest, NextResponse } from 'next/server';
import { deleteRsvp } from '@/lib/db';

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    await deleteRsvp(id);
    return NextResponse.json({ success: true, message: 'RSVP excluído com sucesso.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir confirmação.' }, { status: 500 });
  }
}
