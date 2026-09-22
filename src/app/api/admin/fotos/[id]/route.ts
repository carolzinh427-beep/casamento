import { NextRequest, NextResponse } from 'next/server';
import { deleteFoto } from '@/lib/db';

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> | { id: string } }
) {
  try {
    const { id } = await Promise.resolve(context.params);
    await deleteFoto(id);
    return NextResponse.json({ success: true, message: 'Foto excluída com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir foto' }, { status: 500 });
  }
}
