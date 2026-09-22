import React from 'react';
import { getCasamento, getEventos, getFotos, getPresentes, getRecados } from '@/lib/db';
import PublicWeddingClient from '@/components/public/PublicWeddingClient';

// Força renderização dinâmica para refletir alterações do banco em tempo real
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [casamento, eventos, fotos, presentes, recados] = await Promise.all([
    getCasamento(),
    getEventos(),
    getFotos(),
    getPresentes(),
    getRecados(true), // Apenas recados aprovados
  ]);

  const cerimonia = eventos.find((e) => e.tipo === 'cerimonia') || eventos[0];
  const recepcao = eventos.find((e) => e.tipo === 'recepcao') || eventos[1];

  // Sanitizar presentes para não expor dados privados
  const sanitizedPresentes = presentes.map((p) => ({
    id: p.id,
    nome: p.nome,
    categoria: p.categoria,
    descricao: p.descricao,
    imagem: p.imagem,
    valor: p.valor,
    disponivel: p.disponivel,
  }));

  return (
    <PublicWeddingClient
      casamento={casamento}
      cerimonia={cerimonia}
      recepcao={recepcao}
      fotos={fotos}
      presentes={sanitizedPresentes}
      recados={recados}
    />
  );
}
