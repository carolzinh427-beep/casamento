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
    <section id="home" className="relative pt-20 pb-8 sm:pt-28 sm:pb-14 md:pt-36 md:pb-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Monograma do casal */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-6">
          <div className="w-8 sm:w-12 h-px bg-[#C5A880]/50" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#6B7280] font-sans">
            O Casamento de
          </span>
          <div className="w-8 sm:w-12 h-px bg-[#C5A880]/50" />
        </div>

        {/* Nomes dos Noivos */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#2C302E] tracking-tight leading-tight mb-2 sm:mb-4">
          {brideName}{' '}
          <span className="font-script text-[#C5A880] text-4xl sm:text-6xl md:text-7xl lg:text-8xl align-middle mx-1">
            &
          </span>{' '}
          {groomName}
        </h1>

        {/* Data */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full bg-[#EBF3F0] text-[#52796F] text-xs sm:text-sm font-serif tracking-[0.12em] uppercase font-medium mb-6 sm:mb-10 shadow-xs border border-[#52796F]/20">
          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#52796F]" />
          <span>{formattedDateString}</span>
        </div>

        {/* Foto Principal com moldura editorial */}
        <div className="relative mx-auto max-w-4xl rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border-2 sm:border-4 border-white mb-8 sm:mb-12 aspect-[16/10] sm:aspect-[16/9] bg-[#E8DFD5]/40 group">
          <Image
            src={heroImage}
            alt={`${brideName} & ${groomName}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1024px"
            className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-3 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white text-center sm:text-left">
            <p className="font-script text-2xl sm:text-4xl text-[#FAF7F2] drop-shadow-md">
              Amanda & Hugo
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-xl mx-auto mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#6B7280] mb-3 sm:mb-5 font-sans font-medium">
            Contagem regressiva para o grande dia
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {[
              { label: 'DIAS', value: timeLeft.dias },
              { label: 'HORAS', value: timeLeft.horas },
              { label: 'MIN', value: timeLeft.minutos },
              { label: 'SEG', value: timeLeft.segundos },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/95 border border-[#C5A880]/30 rounded-lg sm:rounded-xl p-2 sm:p-4 text-center shadow-xs backdrop-blur-xs transition-transform hover:-translate-y-0.5"
              >
                <span className="block text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#2C302E]">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="block text-[9px] sm:text-[11px] tracking-wider uppercase text-[#52796F] font-semibold mt-0.5">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Versículo Bíblico e Mensagem Inicial */}
        <div className="max-w-3xl mx-auto bg-white/80 border border-[#E8DFD5] rounded-xl sm:rounded-2xl p-5 sm:p-8 md:p-10 shadow-xs backdrop-blur-xs relative">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF7F2] border border-[#C5A880] flex items-center justify-center">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A880] fill-[#C5A880]/20" />
          </div>

          {bibleVerse && (
            <blockquote className="font-serif italic text-sm sm:text-lg md:text-xl text-[#2C302E] leading-relaxed mb-4 sm:mb-6 font-normal">
              {bibleVerse}
            </blockquote>
          )}

          <div className="w-12 sm:w-16 h-0.5 bg-[#C5A880]/40 mx-auto mb-4 sm:mb-6" />

          {initialMessage && (
            <p className="text-xs sm:text-sm md:text-base text-[#6B7280] leading-relaxed font-sans text-justify sm:text-center">
              {initialMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
