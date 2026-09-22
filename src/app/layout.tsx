import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans, Alex_Brush } from 'next/font/google';
import './globals.css';

const serif = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const sans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const script = Alex_Brush({
  variable: '--font-script',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Amanda & Hugo | 20 de Novembro de 2026',
  description:
    'Com o coração cheio de alegria e gratidão a Deus, convidamos você para celebrar o nosso casamento em Brasília - DF.',
  openGraph: {
    title: 'Amanda & Hugo — Casamento 20.11.2026',
    description: 'Celebre conosco este momento inesquecível em Brasília - DF.',
    images: ['/images/hero.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${serif.variable} ${sans.variable} ${script.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#FAF7F2] text-[#2C302E] antialiased selection:bg-[#C5A880]/30 selection:text-[#2C302E]">
        {children}
      </body>
    </html>
  );
}
