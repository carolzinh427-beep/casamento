'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Calendar, Clock } from 'lucide-react';

interface HeroSectionProps {
  brideName: string;
  groomName: string;
  weddingDateIso: string;
  initialMessage?: string;
  bibleVerse?: string;
  heroImage?: string;
}

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

export default function HeroSection({
  brideName,
  groomName,
  weddingDateIso,
  initialMessage,
  bibleVerse = '"Para que vejam, saibam, considerem, e compreendam que a mão do Senhor fez isso" (Is 41:20)',
  heroImage = '/images/hero.jpg',
}: HeroSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(weddingDateIso).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ dias: 0, horas: 0, minutos: 0, segundos: 0 });
        return;
      }

      const dias = Math.floor(difference / (1000 * 60 * 60 * 24));
      const horas = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((difference / 1000 / 60) % 60);
      const segundos = Math.floor((difference / 1000) % 60);

      setTimeLeft({ dias, horas, minutos, segundos });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [weddingDateIso]);

  const formattedDateString = React.useMemo(() => {
    try {
      const d = new Date(weddingDateIso);
      return d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return '20 de Novembro de 2026';
    }
  }, [weddingDateIso]);

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Monograma do casal */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-px bg-[#C5A880]/50" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#6B7280] font-sans">
            O Casamento de
          </span>
          <div className="w-12 h-px bg-[#C5A880]/50" />
        </div>

        {/* Nomes dos Noivos */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-[#2C302E] tracking-tight leading-none mb-4">
          {brideName}{' '}
          <span className="font-script text-[#C5A880] text-6xl sm:text-7xl md:text-8xl lg:text-9xl align-middle mx-1">
            &
          </span>{' '}
          {groomName}
        </h1>

        {/* Data */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#EBF3F0] text-[#52796F] text-sm sm:text-base font-serif tracking-[0.15em] uppercase font-medium mb-12 shadow-xs border border-[#52796F]/20">
          <Calendar className="w-4 h-4 text-[#52796F]" />
          <span>{formattedDateString}</span>
        </div>

        {/* Foto Principal com moldura editorial */}
        <div className="relative mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl border-4 border-white mb-16 aspect-[16/9] bg-[#E8DFD5]/40 group">
          <Image
            src={heroImage}
            alt={`${brideName} & ${groomName}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-center sm:text-left">
            <p className="font-script text-3xl sm:text-4xl text-[#FAF7F2] drop-shadow-md">
              Amanda & Hugo
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6B7280] mb-6 font-sans">
            Contagem regressiva para o grande dia
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {[
              { label: 'DIAS', value: timeLeft.dias },
              { label: 'HORAS', value: timeLeft.horas },
              { label: 'MINUTOS', value: timeLeft.minutos },
              { label: 'SEGUNDOS', value: timeLeft.segundos },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/90 border border-[#C5A880]/30 rounded-xl p-3 sm:p-5 text-center shadow-xs backdrop-blur-xs transition-transform hover:-translate-y-1"
              >
                <span className="block text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#2C302E]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="block text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#52796F] font-semibold mt-1">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Versículo Bíblico e Mensagem Inicial */}
        <div className="max-w-3xl mx-auto bg-white/70 border border-[#E8DFD5] rounded-2xl p-8 sm:p-12 shadow-xs backdrop-blur-xs relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#C5A880] flex items-center justify-center">
            <Heart className="w-4 h-4 text-[#C5A880] fill-[#C5A880]/20" />
          </div>

          {bibleVerse && (
            <blockquote className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#2C302E] leading-relaxed mb-6 font-normal">
              {bibleVerse}
            </blockquote>
          )}

          <div className="w-16 h-0.5 bg-[#C5A880]/40 mx-auto mb-6" />

          {initialMessage && (
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed font-sans text-justify sm:text-center">
              {initialMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
