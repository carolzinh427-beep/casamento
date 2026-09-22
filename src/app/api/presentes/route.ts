import { NextResponse } from 'next/server';
import { getPresentes } from '@/lib/db';

export async function GET() {
  try {
    const list = await getPresentes();
    // Sanitização para convidados públicos: não expor nomes ou mensagens privadas
    const sanitized = list.map((p) => ({
      id: p.id,
      nome: p.nome,
      categoria: p.categoria,
      descricao: p.descricao,
      imagem: p.imagem,
      valor: p.valor,
      disponivel: p.disponivel,
    }));
    return NextResponse.json(sanitized);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter lista de presentes' }, { status: 500 });
  }
}
