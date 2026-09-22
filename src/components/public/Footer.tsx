import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8DFD5] py-14 text-center">
      <div className="max-w-4xl mx-auto px-4">
        {/* Monograma com Coração */}
        <div className="w-12 h-12 rounded-full border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-4 bg-white shadow-xs">
          <Heart className="w-4 h-4 text-[#C5A880] fill-[#C5A880]/20" />
        </div>

        <h3 className="font-serif text-2xl text-[#2C302E] tracking-tight mb-2">
          Amanda <span className="text-[#C5A880] font-script text-3xl">&</span> Hugo
        </h3>

        <p className="text-xs uppercase tracking-[0.25em] text-[#52796F] font-serif font-medium mb-6">
          20 de Novembro de 2026 • Brasília - DF
        </p>

        <div className="w-12 h-px bg-[#C5A880]/40 mx-auto mb-6" />

        <p className="text-xs text-[#6B7280] font-sans tracking-wide">
          Feito com muito amor para celebrar o dia mais especial de nossas vidas.
        </p>
      </div>
    </footer>
  );
}
