'use client';

import React, { useState, useEffect } from 'react';
import { Music, Heart } from 'lucide-react';

interface EntranceScreenProps {
  onEnter: () => void;
  brideName?: string;
  groomName?: string;
  weddingDateFormatted?: string;
}

export default function EntranceScreen({
  onEnter,
  brideName = 'Amanda',
  groomName = 'Hugo',
  weddingDateFormatted = '20.11.2026',
}: EntranceScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const handleStart = () => {
    setIsFading(true);
    onEnter();
    setTimeout(() => {
      setIsVisible(false);
    }, 900);
  };

  if (!isVisible) return null;

  return (
    <div
      id="entrance-overlay"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] px-6 text-center transition-all duration-1000 ease-out ${
        isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
      style={{
        backgroundImage: `radial-gradient(circle at center, rgba(197, 168, 128, 0.12) 0%, rgba(250, 247, 242, 0.95) 70%)`,
      }}
    >
      {/* Moldura decorativa sutil */}
      <div className="absolute inset-4 md:inset-8 border border-[#C5A880]/30 rounded-2xl pointer-events-none" />
      <div className="absolute inset-6 md:inset-10 border border-[#C5A880]/15 rounded-xl pointer-events-none" />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
        {/* Monograma */}
        <div className="w-16 h-16 rounded-full border border-[#C5A880] flex items-center justify-center mb-6 shadow-sm bg-white/70 backdrop-blur-xs">
          <Heart className="w-6 h-6 text-[#C5A880] fill-[#C5A880]/20 animate-pulse" />
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#6B7280] font-sans mb-3">
          Bem-vindos ao nosso casamento
        </span>

        {/* Nomes dos noivos */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#2C302E] tracking-tight leading-tight mb-3">
          {brideName} <span className="text-[#C5A880] font-script text-5xl sm:text-6xl md:text-7xl align-middle mx-1">&</span> {groomName}
        </h1>

        {/* Data formatada */}
        <p className="text-sm sm:text-base tracking-[0.25em] text-[#52796F] font-serif font-medium mb-8">
          {weddingDateFormatted}
        </p>

        <p className="text-sm text-[#6B7280] max-w-xs mb-10 font-sans leading-relaxed">
          Preparamos este espaço com muito amor para compartilhar nosso grande dia com você.
        </p>

        {/* Botão ENTRAR ♫ */}
        <button
          id="btn-entrar"
          onClick={handleStart}
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#52796F] hover:bg-[#354F52] text-white rounded-full font-sans text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="font-semibold tracking-[0.2em]">ENTRAR</span>
          <span className="text-lg text-[#C5A880] group-hover:rotate-12 transition-transform duration-300">♫</span>
          <div className="absolute -inset-1 rounded-full bg-[#52796F]/20 blur-sm -z-10 group-hover:bg-[#52796F]/40 transition-all" />
        </button>

        <p className="text-[11px] text-[#6B7280]/80 mt-4 tracking-wider uppercase font-sans">
          Toque para entrar com som
        </p>
      </div>
    </div>
  );
}
