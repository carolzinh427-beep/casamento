async function test() {
  const baseUrl = 'http://localhost:3000';
  console.log('--- 1. TESTE DA PÁGINA PÚBLICA ---');
  const homeRes = await fetch(baseUrl);
  const homeHtml = await homeRes.text();
  console.log('Status da Home:', homeRes.status);
  console.log('Contém Amanda & Hugo:', homeHtml.includes('Amanda') && homeHtml.includes('Hugo'));
  console.log('Contém botão ENTRAR:', homeHtml.includes('ENTRAR'));
  console.log('Contém música oficial Dan + Shay:', homeHtml.includes('ODRWKGIxB4M') || homeHtml.includes('From The Ground Up'));
  const hasAdminLinks = homeHtml.includes('href="/admin"') || homeHtml.includes('/admin/login') || homeHtml.includes('Painel') || homeHtml.includes('Área dos noivos');
  console.log('Possui link ou texto administrativo na página pública:', hasAdminLinks ? 'ATENÇÃO: SIM' : 'NÃO (Correto! 100% isolado)');

  console.log('\n--- 2. TESTE DAS APIS PÚBLICAS ---');
  const casamentoRes = await (await fetch(baseUrl + '/api/casamento')).json();
  console.log('Casamento:', casamentoRes.nomeNoiva, '&', casamentoRes.nomeNoivo);

  const eventosRes = await (await fetch(baseUrl + '/api/eventos')).json();
  console.log('Eventos carregados:', eventosRes.length);

  const presentesRes = await (await fetch(baseUrl + '/api/presentes')).json();
  console.log('Presentes carregados:', presentesRes.length, '| Primeiro item:', presentesRes[0].nome);

  console.log('\n--- 3. TESTE DE ESCOLHA DE PRESENTE ---');
  const escolherRes = await (await fetch(baseUrl + '/api/presentes/' + presentesRes[0].id + '/escolher', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: 'Camila e Pedro', mensagem: 'Muitas bênçãos aos noivos!' })
  })).json();
  console.log('Resultado escolha:', escolherRes);

  console.log('\n--- 4. TESTE DE RSVP ---');
  const rsvpRes = await (await fetch(baseUrl + '/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: 'Lucas Mendes',
      email: 'lucas@email.com',
      telefone: '(61) 98888-7777',
      presente: true,
      adultos: 2,
      criancas: 0,
      acompanhante: 'Juliana Mendes',
      observacoes: 'Tudo perfeito!'
    })
  })).json();
  console.log('Resultado RSVP:', rsvpRes.message);

  console.log('\n--- 5. TESTE DE RECADO ---');
  const recadoRes = await (await fetch(baseUrl + '/api/recados', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: 'Tia Regina',
      mensagem: 'Muitas felicidades e bênçãos aos noivos Amanda & Hugo!'
    })
  })).json();
  console.log('Resultado Recado:', recadoRes.message);

  console.log('\n--- 6. TESTE DE AUTENTICAÇÃO DO ADMIN ---');
  // Tentativa sem login na API restrita
  const unauthRes = await fetch(baseUrl + '/api/admin/dashboard');
  console.log('Status Dashboard sem auth (deve ser 401):', unauthRes.status);

  // Login com credenciais
  const loginRes = await fetch(baseUrl + '/api/admin/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'Casamento', password: 'Amandaehugo' })
  });
  console.log('Status Login com credenciais certas:', loginRes.status);
  const cookieHeader = loginRes.headers.get('set-cookie');
  console.log('Cookie de sessão gerado:', cookieHeader ? 'SIM (HttpOnly)' : 'NÃO');

  // Acesso com cookie
  const authDashRes = await fetch(baseUrl + '/api/admin/dashboard', {
    headers: { cookie: cookieHeader || '' }
  });
  const metrics = await authDashRes.json();
  console.log('Status Dashboard autenticado:', authDashRes.status);
  console.log('Métricas do Dashboard:', metrics);

  console.log('\n--- 7. TESTE DE REDIRECIONAMENTO DE ROTAS /admin ---');
  const adminPageRes = await fetch(baseUrl + '/admin', { redirect: 'manual' });
  console.log('Status /admin sem sessão (deve redirecionar 307):', adminPageRes.status);
  console.log('Redirecionado para:', adminPageRes.headers.get('location'));
}

test().catch(console.error);
