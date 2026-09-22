import { NextRequest, NextResponse } from 'next/server';
import { deleteRecado } from '@/lib/db';

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    await deleteRecado(id);
    return NextResponse.json({ success: true, message: 'Recado excluído com sucesso.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir recado.' }, { status: 500 });
  }
}
