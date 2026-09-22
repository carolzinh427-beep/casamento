import { NextRequest, NextResponse } from 'next/server';
import { updatePresente, deletePresente } from '@/lib/db';

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    const body = await req.json();
    const updated = await updatePresente(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Presente não encontrado.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao atualizar presente.' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    await deletePresente(id);
    return NextResponse.json({ success: true, message: 'Presente excluído com sucesso.' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir presente.' }, { status: 500 });
  }
}
