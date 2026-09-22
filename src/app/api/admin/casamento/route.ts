import { NextRequest, NextResponse } from 'next/server';
import { getCasamento, updateCasamento } from '@/lib/db';

export async function GET() {
  try {
    const data = await getCasamento();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao carregar informações' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const updated = await updateCasamento(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar alterações' }, { status: 500 });
  }
}
