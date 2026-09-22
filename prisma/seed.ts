import { PrismaClient } from '@prisma/client';
import giftsFull from '../src/lib/gifts-full.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed para o casamento de Amanda & Hugo...');

  // Limpar tabelas existentes em ordem
  await prisma.rSVP.deleteMany();
  await prisma.convidado.deleteMany();
  await prisma.presente.deleteMany();
  await prisma.foto.deleteMany();
  await prisma.evento.deleteMany();
  await prisma.recado.deleteMany();
  await prisma.casamento.deleteMany();

  // 1. Criar Casamento
  const casamento = await prisma.casamento.create({
    data: {
      nomeNoiva: 'Amanda',
      nomeNoivo: 'Hugo',
      data: new Date('2026-11-20T19:30:00Z'),
      mensagemInicial:
        'Com o coração cheio de alegria e gratidão a Deus, estamos vivendo um dos momentos mais especiais de nossas vidas. Entre tantos caminhos, Deus permitiu que os nossos se encontrassem. E, cercados pelo amor de nossas famílias e amigos, chegou o momento de transformar dois caminhos em um só. Criamos este espaço para dividir com vocês todos os detalhes desse dia que estamos preparando com tanto carinho.',
      historia:
        'Nossa história começou há alguns anos, num dia em que nada parecia diferente, até que um olhar e uma conversa mudaram tudo. Descobrimos no outro a paz de um lar, o riso fácil nos dias comuns e a cumplicidade que nos faz sonhar juntos. Construímos planos, compartilhamos momentos inesquecíveis e aprendemos que o amor verdadeiro é feito de cuidado, respeito e admiração mútua. Agora, estamos prontos para dar o passo mais importante das nossas vidas: celebrar a nossa união para sempre perante Deus e as pessoas que mais amamos.',
      musicaUrl: '/music/casamento.mp3',
    },
  });

  // 2. Criar Eventos
  await prisma.evento.createMany({
    data: [
      {
        casamentoId: casamento.id,
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
        casamentoId: casamento.id,
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
  });

  // 3. Criar Fotos
  await prisma.foto.createMany({
    data: [
      {
        casamentoId: casamento.id,
        url: '/images/hero.jpg',
        ordem: 1,
        principal: true,
        legenda: 'Amanda & Hugo - O início do nosso para sempre',
      },
      {
        casamentoId: casamento.id,
        url: '/images/historia-01.jpg',
        ordem: 2,
        principal: false,
        legenda: 'Viagem inesquecível a dois',
      },
      {
        casamentoId: casamento.id,
        url: '/images/historia-02.jpg',
        ordem: 3,
        principal: false,
        legenda: 'O dia do pedido de casamento',
      },
      {
        casamentoId: casamento.id,
        url: '/images/galeria-01.jpg',
        ordem: 4,
        principal: false,
        legenda: 'Momentos de pura cumplicidade',
      },
      {
        casamentoId: casamento.id,
        url: '/images/galeria-02.jpg',
        ordem: 5,
        principal: false,
        legenda: 'Celebrando a nossa história de amor',
      },
      {
        casamentoId: casamento.id,
        url: '/images/galeria-03.jpg',
        ordem: 6,
        principal: false,
        legenda: 'Um brinde ao nosso futuro',
      },
    ],
  });

  // 4. Criar Presentes (61 itens do catálogo)
  await prisma.presente.createMany({
    data: giftsFull.map((g) => ({
      casamentoId: casamento.id,
      nome: g.nome,
      categoria: g.categoria,
      descricao: g.descricao,
      imagem: g.imagem,
      valor: g.valor,
      disponivel: g.disponivel,
    })),
  });

  // 5. Criar Recados iniciais
  await prisma.recado.createMany({
    data: [
      {
        casamentoId: casamento.id,
        nome: 'Tia Cristina e Família',
        mensagem:
          'Que Deus derrame infinitas bênçãos sobre essa união tão linda! Amanda e Hugo, vocês formam um casal inspirador. Estamos contando os dias para celebrar com vocês!',
        aprovado: true,
      },
      {
        casamentoId: casamento.id,
        nome: 'Lucas & Beatriz',
        mensagem:
          'Amigos queridos, parabéns por esse grande passo! Que a caminhada de vocês seja repleta de cumplicidade, paciência e muito amor.',
        aprovado: true,
      },
      {
        casamentoId: casamento.id,
        nome: 'Família Rocha',
        mensagem:
          'Desejamos toda a felicidade do mundo nessa nova etapa! Que o lar de vocês seja sempre abrigo de paz e alegria.',
        aprovado: false,
      },
    ],
  });

  console.log('Seed concluído com sucesso para Amanda & Hugo!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
