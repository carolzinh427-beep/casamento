const fs = require('fs');
const path = require('path');

const gifts = [
  { file: 'passagens.jpg', title: 'Passagens Aéreas', icon: '✈️', color: '#5B7065' },
  { file: 'adega.jpg', title: 'Adega Climatizada', icon: '🍷', color: '#7A5C58' },
  { file: 'carro.jpg', title: 'Aluguel de Carro', icon: '🚗', color: '#52796F' },
  { file: 'aparelho-jantar.jpg', title: 'Aparelho de Jantar', icon: '🍽️', color: '#6B705C' },
  { file: 'fondue.jpg', title: 'Aparelho de Fondue', icon: '🫕', color: '#805D60' },
  { file: 'ar-condicionado.jpg', title: 'Ar Condicionado', icon: '❄️', color: '#5C6B73' },
  { file: 'batedeira.jpg', title: 'Batedeira Planetária', icon: '🥣', color: '#8A7968' },
  { file: 'cadeiras.jpg', title: 'Cadeiras Estofadas', icon: '🪑', color: '#73685C' },
  { file: 'faqueiro.jpg', title: 'Faqueiro Inox', icon: '🍴', color: '#6A7B76' },
  { file: 'geladeira.jpg', title: 'Geladeira French Door', icon: '🧊', color: '#4F6D7A' },
  { file: 'tacas.jpg', title: 'Taças de Cristal', icon: '🥂', color: '#8C7B65' },
  { file: 'cafeteira.jpg', title: 'Máquina de Café', icon: '☕', color: '#6B584E' },
  { file: 'padrao.jpg', title: 'Presente dos Noivos', icon: '🎁', color: '#5B7065' },
];

const dir = path.join(__dirname, '..', 'public', 'images', 'presentes');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

gifts.forEach(g => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF7F2"/>
      <stop offset="100%" stop-color="#F3ECE1"/>
    </linearGradient>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${g.color}"/>
      <stop offset="100%" stop-color="#2D3B36"/>
    </linearGradient>
  </defs>
  <rect width="600" height="400" fill="url(#bg)"/>
  <rect x="24" y="24" width="552" height="352" rx="20" fill="none" stroke="#C5A880" stroke-width="1.5" stroke-dasharray="4,4"/>
  <circle cx="300" cy="170" r="70" fill="url(#cardBg)"/>
  <text x="300" y="188" font-size="64" text-anchor="middle" dominant-baseline="middle">${g.icon}</text>
  <text x="300" y="290" font-family="Georgia, serif" font-size="24" font-weight="600" fill="#2C302E" text-anchor="middle">${g.title}</text>
  <text x="300" y="320" font-family="'Helvetica Neue', sans-serif" font-size="13" letter-spacing="3" fill="#8C7B65" text-anchor="middle">LISTA DE CASAMENTO • AMANDA &amp; HUGO</text>
</svg>`;

  fs.writeFileSync(path.join(dir, g.file), svg);
});

console.log('Imagens de presentes criadas com sucesso!');
