import prisma from './prisma';
import giftsFull from './gifts-full.json';

export interface PresenteItem {
  id: string;
  nome: string;
  categoria?: string;
  descricao: string;
  imagem: string;
  valor: number;
  disponivel: boolean;
  escolhidoPor?: string | null;
  escolhidoEm?: string | Date | null;
  mensagemConvidado?: string | null;
}

// Dados iniciais reais para o casamento de Amanda & Hugo
export const INITIAL_DATA: {
  casamento: {
    id: string;
    nomeNoiva: string;
    nomeNoivo: string;
    data: string;
    versiculo: string;
    mensagemInicial: string;
    historia: string;
    musicaUrl: string;
  };
  eventos: any[];
  fotos: any[];
  presentes: PresenteItem[];
  rsvps: any[];
  recados: any[];
} = {
  casamento: {
    id: 'casamento-amanda-hugo-2026',
    nomeNoiva: 'Amanda',
    nomeNoivo: 'Hugo',
    data: new Date('2026-11-20T19:30:00Z').toISOString(),
    versiculo: '"Para que vejam, saibam, considerem, e compreendam que a mão do Senhor fez isso" (Is 41:20)',
    mensagemInicial:
      'Com o coração cheio de alegria e gratidão a Deus, estamos vivendo um dos momentos mais especiais de nossas vidas. Entre tantos caminhos, Deus permitiu que os nossos se encontrassem. E, cercados pelo amor de nossas famílias e amigos, chegou o momento de transformar dois caminhos em um só. Criamos este espaço para dividir com vocês todos os detalhes desse dia que estamos preparando com tanto carinho.',
    historia:
      'Nossa história começou há alguns anos, num dia em que nada parecia diferente, até que um olhar e uma conversa mudaram tudo. Descobrimos no outro a paz de um lar, o riso fácil nos dias comuns e a cumplicidade que nos faz sonhar juntos. Construímos planos, compartilhamos momentos inesquecíveis e aprendemos que o amor verdadeiro é feito de cuidado, respeito e admiração mútua. Agora, estamos prontos para dar o passo mais importante das nossas vidas: celebrar a nossa união para sempre perante Deus e as pessoas que mais amamos.',
    musicaUrl: 'https://www.youtube.com/watch?v=ODRWKGIxB4M',
  },
  eventos: [
    {
      id: 'evento-cerimonia',
      tipo: 'cerimonia',
      titulo: 'Cerimônia Religiosa',
      descricao:
        'Será uma grande alegria celebrar o momento em que nossa união será abençoada diante de Deus. A cerimônia será pontual, com início no horário informado. Pedimos com carinho que cheguem com antecedência para compartilharmos juntos este momento inesquecível.',
      data: '20 de Novembro de 2026',
      horario: '19h30',
      endereco: 'Paróquia Nossa Senhora do Perpétuo Socorro, Lago Sul, Brasília - DF, CEP: 71620-410',
      mapsUrl: 'https://maps.google.com/?q=Paróquia+Nossa+Senhora+do+Perpétuo+Socorro+Lago+Sul+Brasília',
      foto: '/images/cerimonia.jpg',
    },
    {
      id: 'evento-recepcao',
      tipo: 'recepcao',
      titulo: 'Recepção dos Noivos',
      descricao:
        'Após a cerimônia, teremos a alegria de recebê-los para a nossa recepção, que acontecerá em um espaço reservado exclusivamente para a celebração do nosso casamento. Preparamos este momento com muito carinho para comemorarmos juntos, com um jantar especial e muita alegria.',
      data: '20 de Novembro de 2026',
      horario: 'Após a Cerimônia',
      endereco: 'Salão de Festas do Restaurante NAU Frutos do Mar, Setor de Clubes Esportivos Sul, Brasília - DF, CEP: 70297-400',
      mapsUrl: 'https://maps.google.com/?q=Restaurante+NAU+Frutos+do+Mar+Brasília',
      foto: '/images/recepcao.jpg',
    },
  ],
  fotos: [
    {
      id: 'foto-1',
      url: '/images/hero.jpg',
      ordem: 1,
      principal: true,
      legenda: 'Amanda & Hugo - O início do nosso para sempre',
    },
    {
      id: 'foto-2',
      url: '/images/historia-01.jpg',
      ordem: 2,
      principal: false,
      legenda: 'Onde quer que a gente vá, o meu lugar favorito é com você',
    },
    {
      id: 'foto-3',
      url: '/images/historia-02.jpg',
      ordem: 3,
      principal: false,
      legenda: 'O dia do pedido de casamento',
    },
    {
      id: 'foto-4',
      url: '/images/galeria-01.jpg',
      ordem: 4,
      principal: false,
      legenda: 'Momentos de pura cumplicidade',
    },
    {
      id: 'foto-5',
      url: '/images/galeria-02.jpg',
      ordem: 5,
      principal: false,
      legenda: 'Celebrando a nossa história de amor',
    },
    {
      id: 'foto-6',
      url: '/images/galeria-03.jpg',
      ordem: 6,
      principal: false,
      legenda: 'Um brinde ao nosso futuro',
    },
  ],
  presentes: giftsFull as PresenteItem[],
  rsvps: [
    {
      id: 'rsvp-1',
      nome: 'Mariana e Rafael Albuquerque',
      email: 'mariana.alb@exemplo.com',
      telefone: '(61) 98877-6655',
      presente: true,
      adultos: 2,
      criancas: 0,
      acompanhante: 'Rafael Albuquerque',
      observacoes: 'Muito felizes por vocês! Contem com a nossa presença.',
      createdAt: new Date('2026-09-10T14:30:00Z').toISOString(),
    },
    {
      id: 'rsvp-2',
      nome: 'Carlos Eduardo Santos',
      email: 'carlos.santos@exemplo.com',
      telefone: '(61) 99123-4567',
      presente: true,
      adultos: 1,
      criancas: 1,
      acompanhante: 'Lucas Santos (Filho)',
      observacoes: 'Será uma honra participar desse dia abençoado.',
      createdAt: new Date('2026-09-12T18:20:00Z').toISOString(),
    },
  ],
  recados: [
    {
      id: 'recado-1',
      nome: 'Tia Cristina e Família',
      mensagem:
        'Que Deus derrame infinitas bênçãos sobre essa união tão linda! Amanda e Hugo, vocês formam um casal inspirador. Estamos contando os dias para celebrar com vocês!',
      aprovado: true,
      createdAt: new Date('2026-09-15T11:00:00Z').toISOString(),
    },
    {
      id: 'recado-2',
      nome: 'Lucas & Beatriz',
      mensagem:
        'Amigos queridos, parabéns por esse grande passo! Que a caminhada de vocês seja repleta de cumplicidade, paciência e muito amor.',
      aprovado: true,
      createdAt: new Date('2026-09-18T16:45:00Z').toISOString(),
    },
    {
      id: 'recado-3',
      nome: 'Família Rocha',
      mensagem:
        'Desejamos toda a felicidade do mundo nessa nova etapa! Que o lar de vocês seja sempre abrigo de paz e alegria.',
      aprovado: false, // Pendente de moderação para demonstrar a tela de aprovação
      createdAt: new Date('2026-09-21T20:10:00Z').toISOString(),
    },
  ],
};

// Armazenamento em memória/estado local persistente caso o PostgreSQL esteja offline no ambiente de dev
const memoryStore = {
  casamento: { ...INITIAL_DATA.casamento },
  eventos: [...INITIAL_DATA.eventos],
  fotos: [...INITIAL_DATA.fotos],
  presentes: [...INITIAL_DATA.presentes],
  rsvps: [...INITIAL_DATA.rsvps],
  recados: [...INITIAL_DATA.recados],
};

let dbIsConnected: boolean | null = null;

export async function isDatabaseConnected(): Promise<boolean> {
  if (dbIsConnected !== null) return dbIsConnected;
  try {
    // Tenta uma consulta rápida no Prisma
    await prisma.$queryRaw`SELECT 1`;
    dbIsConnected = true;
    return true;
  } catch {
    dbIsConnected = false;
    return false;
  }
}

// 1. Casamento
export async function getCasamento() {
  try {
    if (await isDatabaseConnected()) {
      const item = await prisma.casamento.findFirst();
      if (item) {
        return {
          ...item,
          data: item.data.toISOString(),
        };
      }
    }
  } catch (err) {
    console.warn('PostgreSQL offline, utilizando store local:', err);
  }
  return memoryStore.casamento;
}

export async function updateCasamento(data: Partial<typeof INITIAL_DATA.casamento>) {
  try {
    if (await isDatabaseConnected()) {
      const existing = await prisma.casamento.findFirst();
      if (existing) {
        const updated = await prisma.casamento.update({
          where: { id: existing.id },
          data: {
            nomeNoiva: data.nomeNoiva,
            nomeNoivo: data.nomeNoivo,
            data: data.data ? new Date(data.data) : undefined,
            mensagemInicial: data.mensagemInicial,
            historia: data.historia,
            musicaUrl: data.musicaUrl,
          },
        });
        return {
          ...updated,
          data: updated.data.toISOString(),
        };
      }
    }
  } catch (err) {
    console.warn('Erro ao salvar Casamento no PostgreSQL, salvando local:', err);
  }
  memoryStore.casamento = { ...memoryStore.casamento, ...data };
  return memoryStore.casamento;
}

// 2. Eventos
export async function getEventos() {
  try {
    if (await isDatabaseConnected()) {
      const list = await prisma.evento.findMany({ orderBy: { createdAt: 'asc' } });
      if (list && list.length > 0) return list;
    }
  } catch (err) {
    console.warn('PostgreSQL offline, utilizando store local:', err);
  }
  return memoryStore.eventos;
}

export async function updateEvento(id: string, data: Partial<(typeof INITIAL_DATA.eventos)[0]>) {
  try {
    if (await isDatabaseConnected()) {
      return await prisma.evento.update({
        where: { id },
        data,
      });
    }
  } catch (err) {
    console.warn('Erro ao atualizar Evento no PostgreSQL, salvando local:', err);
  }
  const index = memoryStore.eventos.findIndex((e) => e.id === id);
  if (index !== -1) {
    memoryStore.eventos[index] = { ...memoryStore.eventos[index], ...data };
    return memoryStore.eventos[index];
  }
  return null;
}

// 3. Fotos
export async function getFotos() {
  try {
    if (await isDatabaseConnected()) {
      const list = await prisma.foto.findMany({ orderBy: { ordem: 'asc' } });
      if (list && list.length > 0) return list;
    }
  } catch (err) {
    console.warn('PostgreSQL offline, utilizando store local:', err);
  }
  return memoryStore.fotos;
}

export async function createFoto(data: { url: string; legenda?: string; principal?: boolean }) {
  const newFoto = {
    id: `foto-${Date.now()}`,
    url: data.url,
    legenda: data.legenda || '',
    ordem: memoryStore.fotos.length + 1,
    principal: Boolean(data.principal),
  };

  try {
    if (await isDatabaseConnected()) {
      const casamento = await prisma.casamento.findFirst();
      if (casamento) {
        return await prisma.foto.create({
          data: {
            casamentoId: casamento.id,
            url: data.url,
            legenda: data.legenda,
            principal: data.principal || false,
            ordem: memoryStore.fotos.length + 1,
          },
        });
      }
    }
  } catch (err) {
    console.warn('Erro ao criar Foto no PostgreSQL, salvando local:', err);
  }

  memoryStore.fotos.push(newFoto);
  return newFoto;
}

export async function deleteFoto(id: string) {
  try {
    if (await isDatabaseConnected()) {
      await prisma.foto.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.warn('Erro ao deletar Foto no PostgreSQL, removendo local:', err);
  }
  memoryStore.fotos = memoryStore.fotos.filter((f) => f.id !== id);
  return true;
}

// 4. Presentes
export async function getPresentes() {
  try {
    if (await isDatabaseConnected()) {
      const list = await prisma.presente.findMany({ orderBy: { valor: 'asc' } });
      if (list && list.length > 0) return list;
    }
  } catch (err) {
    console.warn('PostgreSQL offline, utilizando store local:', err);
  }
  return memoryStore.presentes;
}

export async function createPresente(data: {
  nome: string;
  categoria?: string;
  descricao: string;
  imagem: string;
  valor: number;
}) {
  const newPresente = {
    id: `pres-${Date.now()}`,
    nome: data.nome,
    categoria: data.categoria || 'Geral',
    descricao: data.descricao,
    imagem: data.imagem,
    valor: Number(data.valor),
    disponivel: true,
    escolhidoPor: null,
    escolhidoEm: null,
    mensagemConvidado: null,
  };

  try {
    if (await isDatabaseConnected()) {
      const casamento = await prisma.casamento.findFirst();
      if (casamento) {
        return await prisma.presente.create({
          data: {
            casamentoId: casamento.id,
            ...newPresente,
          },
        });
      }
    }
  } catch (err) {
    console.warn('Erro ao criar Presente no PostgreSQL, salvando local:', err);
  }

  memoryStore.presentes.push(newPresente);
  return newPresente;
}

export async function updatePresente(
  id: string,
  data: Partial<(typeof INITIAL_DATA.presentes)[0]>
) {
  try {
    if (await isDatabaseConnected()) {
      return await prisma.presente.update({
        where: { id },
        data: {
          ...data,
          valor: data.valor !== undefined ? Number(data.valor) : undefined,
        },
      });
    }
  } catch (err) {
    console.warn('Erro ao atualizar Presente no PostgreSQL, salvando local:', err);
  }

  const index = memoryStore.presentes.findIndex((p) => p.id === id);
  if (index !== -1) {
    memoryStore.presentes[index] = { ...memoryStore.presentes[index], ...data };
    return memoryStore.presentes[index];
  }
  return null;
}

export async function deletePresente(id: string) {
  try {
    if (await isDatabaseConnected()) {
      await prisma.presente.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.warn('Erro ao deletar Presente no PostgreSQL, removendo local:', err);
  }
  memoryStore.presentes = memoryStore.presentes.filter((p) => p.id !== id);
  return true;
}

export async function escolherPresente(
  id: string,
  escolhidoPor: string,
  mensagemConvidado?: string
) {
  const agora = new Date().toISOString();

  try {
    if (await isDatabaseConnected()) {
      const updated = await prisma.presente.update({
        where: { id },
        data: {
          disponivel: false,
          escolhidoPor,
          escolhidoEm: new Date(agora),
          mensagemConvidado: mensagemConvidado || '',
        },
      });
      return updated;
    }
  } catch (err) {
    console.warn('Erro ao escolher Presente no PostgreSQL, salvando local:', err);
  }

  const index = memoryStore.presentes.findIndex((p) => p.id === id);
  if (index !== -1) {
    memoryStore.presentes[index] = {
      ...memoryStore.presentes[index],
      disponivel: false,
      escolhidoPor,
      escolhidoEm: agora,
      mensagemConvidado: mensagemConvidado || '',
    };
    return memoryStore.presentes[index];
  }
  return null;
}

// 5. RSVP
export async function getRsvps() {
  try {
    if (await isDatabaseConnected()) {
      const list = await prisma.rSVP.findMany({
        include: { convidado: true },
        orderBy: { createdAt: 'desc' },
      });
      if (list && list.length > 0) {
        return list.map((r) => ({
          id: r.id,
          nome: r.convidado.nome,
          email: r.convidado.email || '',
          telefone: r.convidado.telefone,
          presente: r.presente,
          adultos: r.adultos,
          criancas: r.criancas,
          acompanhante: r.acompanhante || '',
          observacoes: r.observacoes || '',
          createdAt: r.createdAt.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn('PostgreSQL offline, utilizando store local:', err);
  }
  return memoryStore.rsvps;
}

export async function createRsvp(data: {
  nome: string;
  email?: string;
  telefone: string;
  presente: boolean;
  adultos: number;
  criancas: number;
  acompanhante?: string;
  observacoes?: string;
}) {
  const agora = new Date().toISOString();
  const cleanEmail = data.email ? data.email.trim().toLowerCase() : '';
  const newRsvp = {
    id: `rsvp-${Date.now()}`,
    nome: data.nome,
    email: cleanEmail,
    telefone: data.telefone,
    presente: Boolean(data.presente),
    adultos: Number(data.adultos) || 1,
    criancas: Number(data.criancas) || 0,
    acompanhante: data.acompanhante || '',
    observacoes: data.observacoes || '',
    createdAt: agora,
  };

  try {
    if (await isDatabaseConnected()) {
      const casamento = await prisma.casamento.findFirst();
      if (casamento) {
        const convidado = await prisma.convidado.create({
          data: {
            casamentoId: casamento.id,
            nome: data.nome,
            email: cleanEmail || null,
            telefone: data.telefone,
          },
        });
        const rsvp = await prisma.rSVP.create({
          data: {
            convidadoId: convidado.id,
            presente: Boolean(data.presente),
            adultos: Number(data.adultos) || 1,
            criancas: Number(data.criancas) || 0,
            acompanhante: data.acompanhante,
            observacoes: data.observacoes,
          },
        });
        return {
          ...newRsvp,
          id: rsvp.id,
        };
      }
    }
  } catch (err) {
    console.warn('Erro ao salvar RSVP no PostgreSQL, salvando local:', err);
  }

  memoryStore.rsvps.unshift(newRsvp);
  return newRsvp;
}

export async function deleteRsvp(id: string) {
  try {
    if (await isDatabaseConnected()) {
      await prisma.rSVP.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.warn('Erro ao deletar RSVP no PostgreSQL, removendo local:', err);
  }
  memoryStore.rsvps = memoryStore.rsvps.filter((r) => r.id !== id);
  return true;
}

// 6. Recados
export async function getRecados(onlyApproved = false) {
  try {
    if (await isDatabaseConnected()) {
      const list = await prisma.recado.findMany({
        where: onlyApproved ? { aprovado: true } : undefined,
        orderBy: { createdAt: 'desc' },
      });
      if (list && list.length > 0) {
        return list.map((r) => ({
          ...r,
          createdAt: r.createdAt.toISOString(),
        }));
      }
    }
  } catch (err) {
    console.warn('PostgreSQL offline, utilizando store local:', err);
  }

  if (onlyApproved) {
    return memoryStore.recados.filter((r) => r.aprovado);
  }
  return memoryStore.recados;
}

export async function createRecado(nome: string, mensagem: string) {
  const agora = new Date().toISOString();
  const newRecado = {
    id: `recado-${Date.now()}`,
    nome,
    mensagem,
    aprovado: false, // Novos recados entram sempre como pendentes
    createdAt: agora,
  };

  try {
    if (await isDatabaseConnected()) {
      const casamento = await prisma.casamento.findFirst();
      if (casamento) {
        const item = await prisma.recado.create({
          data: {
            casamentoId: casamento.id,
            nome,
            mensagem,
            aprovado: false,
          },
        });
        return {
          ...item,
          createdAt: item.createdAt.toISOString(),
        };
      }
    }
  } catch (err) {
    console.warn('Erro ao criar Recado no PostgreSQL, salvando local:', err);
  }

  memoryStore.recados.unshift(newRecado);
  return newRecado;
}

export async function aprovarRecado(id: string) {
  try {
    if (await isDatabaseConnected()) {
      const item = await prisma.recado.update({
        where: { id },
        data: { aprovado: true },
      });
      return {
        ...item,
        createdAt: item.createdAt.toISOString(),
      };
    }
  } catch (err) {
    console.warn('Erro ao aprovar Recado no PostgreSQL, aprovando local:', err);
  }

  const index = memoryStore.recados.findIndex((r) => r.id === id);
  if (index !== -1) {
    memoryStore.recados[index].aprovado = true;
    return memoryStore.recados[index];
  }
  return null;
}

export async function deleteRecado(id: string) {
  try {
    if (await isDatabaseConnected()) {
      await prisma.recado.delete({ where: { id } });
      return true;
    }
  } catch (err) {
    console.warn('Erro ao deletar Recado no PostgreSQL, removendo local:', err);
  }
  memoryStore.recados = memoryStore.recados.filter((r) => r.id !== id);
  return true;
}

// 7. Métricas do Dashboard Administrativo
export async function getDashboardMetrics() {
  const [rsvps, presentes, recados] = await Promise.all([
    getRsvps(),
    getPresentes(),
    getRecados(false),
  ]);

  const confirmados = rsvps.filter((r) => r.presente).length;
  const naoConfirmados = rsvps.filter((r) => !r.presente).length;
  const totalAdultos = rsvps.reduce((acc, r) => acc + (r.presente ? r.adultos : 0), 0);
  const totalCriancas = rsvps.reduce((acc, r) => acc + (r.presente ? r.criancas : 0), 0);
  const presentesDisponiveis = presentes.filter((p) => p.disponivel).length;
  const presentesEscolhidos = presentes.filter((p) => !p.disponivel).length;
  const recadosPendentes = recados.filter((r) => !r.aprovado).length;

  return {
    totalConfirmacoes: rsvps.length,
    confirmados,
    naoConfirmados,
    totalAdultos,
    totalCriancas,
    totalRecados: recados.length,
    recadosPendentes,
    presentesDisponiveis,
    presentesEscolhidos,
  };
}
