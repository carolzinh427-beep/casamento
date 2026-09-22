# 💍 Amanda & Hugo — Site Completo de Casamento

Aplicação web completa, moderna e sofisticada para o casamento de **Amanda & Hugo** (data: **20 de Novembro de 2026**, Brasília - DF), desenvolvida com foco em experiência mobile-first, estética editorial romântica, controle de áudio ininterrupto, confirmação de presença (RSVP), lista de presentes, mural de recados moderado e **Painel Administrativo (`/admin`) 100% isolado**.

---

## 🌟 Principais Funcionalidades

### 1. Site Público (Convidados)
- **Abertura Interativa com Som (`ENTRAR ♫`)**: Tela de abertura elegante com os nomes dos noivos, data e botão central que desbloqueia a política de autoplay de áudio dos navegadores, iniciando a música de fundo e disparando as animações da página.
- **Player de Música Persistente**: Botão flutuante minimalista no canto da tela (`♫` com animação de ondas sonoras quando ativo / `❚❚` quando pausado) que permite pausar e retomar a música a qualquer momento sem interrupção durante a navegação.
- **Contagem Regressiva Dinâmica**: Dias, Horas, Minutos e Segundos calculados em tempo real diretamente a partir da data cadastrada no banco de dados.
- **Nossa História**: Narrativa romântica dos noivos com fotos e citações bíblicas.
- **Cerimônia Religiosa & Recepção**: Detalhes de dia, horário, fotos dos locais, mapas interativos incorporados e botões diretos "COMO CHEGAR" com navegação no Google Maps.
- **Galeria dos Noivos**: Grid responsivo com efeito hover, lazy loading e Lightbox modal com zoom, setas de navegação e teclado (Esc, setas).
- **Lista de Presentes Interativa**: Catálogo com valores em reais (R$), categorias e botão "ESCOLHER PRESENTE". Ao presentear, o convidado informa seu nome e mensagem de carinho; o item é marcado como indisponível e celebração com confetes é disparada. **Privacidade garantida**: os dados do convidado não são expostos publicamente.
- **Confirmação de Presença (RSVP)**: Formulário completo com validação no backend, máscara de telefone brasileira, contagem de adultos e crianças, nome de acompanhante e proteção invisível anti-spam.
- **Mural de Recados Moderado**: Formulário para os convidados deixarem mensagens de afeto. Toda nova mensagem entra como pendente e só é exibida publicamente após a aprovação no painel administrativo.
- **Isolamento Total do Admin**: **Nenhum** link, botão, ícone, texto ou rodapé no site público faz menção ao painel administrativo.

---

### 2. Painel Administrativo (`/admin`)
- **Acesso Restrito**: Rota não divulgada, acessível estritamente via URL direta `/admin`, com tela de login em `/admin/login`.
- **Autenticação Segura**: Sessão baseada em tokens JWT assinados via biblioteca `jose` e cookies `HttpOnly` com proteção contra CSRF/XSS.
- **Dashboard de Métricas**:
  - Total de confirmações de presença
  - Confirmados (Sim) vs. Não confirmados
  - Contagem total de adultos e crianças
  - Recados aguardando moderação
  - Presentes disponíveis vs. já escolhidos
- **Gestão Completa**:
  - **Dados do Casal**: Edição de nomes, data do casamento, mensagem inicial, história e URL da música.
  - **Cerimônia e Recepção**: Edição de horários, endereços completos, descrições e links de mapas.
  - **Fotos**: Cadastro de novas fotos por URL, exclusão e definição de foto principal.
  - **Lista de Presentes**: Criação, edição de preços/imagens, alternância de disponibilidade e **visualização privada de quem presenteou** (nome, data/hora e mensagem pessoal).
  - **Controle de RSVP**: Tabela completa de convidados com filtros (*Todos*, *Confirmados*, *Não confirmados*), dados de contato, acompanhantes e exclusão.
  - **Mural de Recados**: Moderação com botões de **Aprovar** e **Excluir**.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Ícones & Efeitos**: [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Segurança**: [Jose](https://github.com/panva/jose) (JWT seguro para cookies HttpOnly)
- **Backend & Banco de Dados**: Next.js Route Handlers, [Prisma ORM](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/)

---

## 📦 Estrutura do Projeto

```
weding/
├── prisma/
│   ├── schema.prisma              # Definição dos modelos para PostgreSQL
│   └── seed.ts                    # Script de seed com dados reais de Amanda & Hugo
├── public/
│   ├── music/
│   │   └── casamento.mp3          # Arquivo de áudio inicial
│   └── images/
│       ├── hero.jpg               # Foto de capa do casal
│       ├── cerimonia.jpg          # Foto da igreja/paróquia
│       ├── recepcao.jpg           # Foto do salão de festas
│       ├── historia-01.jpg        # Fotos da história
│       ├── historia-02.jpg
│       └── presentes/             # Imagens da lista de presentes
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout com fontes Google (Cormorant, Plus Jakarta, Alex Brush)
│   │   ├── page.tsx               # Página pública (Server Component de alta performance)
│   │   ├── globals.css            # Tokens de estilo, cores de casamento e animações
│   │   ├── admin/
│   │   │   ├── layout.tsx         # Layout do painel com header e logout
│   │   │   ├── page.tsx           # Dashboard com métricas e abas de gestão
│   │   │   └── login/page.tsx     # Tela de login administrativo
│   │   └── api/                   # Rotas de API públicas e administrativas
│   ├── components/
│   │   └── public/                # Componentes da experiência dos noivos e convidados
│   ├── lib/
│   │   ├── auth.ts                # Sessão e validação segura de credenciais
│   │   ├── db.ts                  # Camada de banco de dados com suporte a Prisma
│   │   └── prisma.ts              # Instância singleton do Prisma Client
│   └── middleware.ts              # Interceptador e proteção de rotas /admin e /api/admin
├── .env.example                   # Exemplo de variáveis de ambiente
├── .env                           # Configuração local
└── package.json
```

---

## 🚀 Como Executar o Projeto Localmente

### 1. Pré-requisitos
- Node.js (versão 18+ ou 20+)
- npm instalado
- PostgreSQL (local, via Docker ou na nuvem como Supabase/Neon)

### 2. Clonar ou Acessar a Pasta
```bash
cd weding
```

### 3. Instalar as Dependências
```bash
npm install
```

### 4. Configurar as Variáveis de Ambiente
Copie o arquivo `.env.example` para `.env`:
```bash
cp .env.example .env
```
Preencha o `.env` com a URL do seu PostgreSQL e as credenciais desejadas:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/casamento_amanda_hugo?schema=public"
ADMIN_USERNAME="Casamento"
ADMIN_PASSWORD="Amandaehugo"
JWT_SECRET="casamento_amanda_e_hugo_super_secret_token_key_2026"
```

### 5. Configurar o Banco de Dados com Prisma
Gere o Prisma Client e execute as migrations:
```bash
# Gerar os tipos do Prisma Client
npx prisma generate

# Criar as tabelas no PostgreSQL
npx prisma migrate dev --name init

# Popular o banco com os dados reais de Amanda & Hugo
npx prisma db seed
```

> **Nota para Desenvolvimento**: Caso você inicie o projeto sem o PostgreSQL rodando de imediato, a aplicação possui um fallback gracioso que carrega os dados reais em memória para que você possa testar a interface, o áudio, o RSVP e os recados sem travar a inicialização.

### 6. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse no seu navegador:
- **Site Público do Casamento**: `http://localhost:3000`
- **Painel Administrativo**: `http://localhost:3000/admin`

---

## 🔐 Acesso ao Painel Administrativo

- **URL Direta**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Usuário Padrão**: `Casamento`
- **Senha Padrão**: `Amandaehugo`

> Para alterar o usuário e a senha em produção, basta atualizar as variáveis `ADMIN_USERNAME` e `ADMIN_PASSWORD` no arquivo `.env` ou no painel do seu provedor de hospedagem (Vercel, Railway, Render, etc.).

---

## 🎵 Como Alterar a Música do Casamento

1. Coloque o seu arquivo `.mp3` na pasta `public/music/` (exemplo: `public/music/casamento.mp3`).
2. Se o nome do arquivo for diferente, acesse o painel em `/admin` > aba **Dados dos Noivos** > campo **URL do Arquivo de Música** e informe o caminho (exemplo: `/music/sua-musica.mp3`).
3. Clique em **Salvar Alterações**.

---

## 📸 Como Adicionar as Fotos Reais do Casal

1. Coloque as fotos reais em alta resolução na pasta `public/images/`:
   - `hero.jpg`: Foto principal de capa dos noivos.
   - `historia-01.jpg` e `historia-02.jpg`: Fotos para a seção Nossa História.
   - `cerimonia.jpg`: Foto da paróquia / altar.
   - `recepcao.jpg`: Foto do salão de festas.
2. Para adicionar mais fotos à galeria, acesse o painel `/admin` > aba **Fotos da Galeria** e insira o caminho da foto (ex: `/images/minha-foto.jpg`) com legenda opcional.

---

## 🚢 Deploy em Produção

O projeto foi construído seguindo os padrões do Next.js App Router e pode ser implantado com 1 clique na [Vercel](https://vercel.com/) ou em qualquer servidor Node / Docker:

1. Suba o código para o seu repositório no GitHub.
2. Importe o projeto na Vercel.
3. Nas configurações de **Environment Variables**, adicione:
   - `DATABASE_URL`: Connection string do seu PostgreSQL (ex: [Neon](https://neon.tech/) ou [Supabase](https://supabase.com/)).
   - `ADMIN_USERNAME`: Nome de usuário desejado.
   - `ADMIN_PASSWORD`: Senha forte desejada.
   - `JWT_SECRET`: Chave secreta aleatória para assinatura dos tokens de sessão.
4. Execute `npx prisma migrate deploy` no build ou pipeline de deploy.
