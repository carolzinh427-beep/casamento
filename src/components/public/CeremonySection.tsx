import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Navigation } from 'lucide-react';

interface CeremonySectionProps {
  titulo?: string;
  data?: string;
  horario?: string;
  endereco?: string;
  descricao?: string;
  mapsUrl?: string;
  foto?: string;
}

export default function CeremonySection({
  titulo = 'Cerimônia Religiosa',
  data = '20 de Novembro de 2026',
  horario = '19h30',
  endereco = 'Paróquia Nossa Senhora do Perpétuo Socorro, Lago Sul, Brasília - DF, CEP: 71620-410',
  descricao = 'Será uma grande alegria celebrar o momento em que nossa união será abençoada diante de Deus. A cerimônia será extremamente pontual, com início no horário informado. Pedimos com carinho que cheguem com antecedência para compartilharmos juntos um dia inesquecível.',
  mapsUrl = 'https://maps.google.com/?q=Paróquia+Nossa+Senhora+do+Perpétuo+Socorro+Lago+Sul+Brasília',
  foto = '/images/cerimonia.jpg',
}: CeremonySectionProps) {
  // Cria URL de embed seguro do Google Maps
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="cerimonia" className="py-10 md:py-16 lg:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#52796F] font-sans font-semibold">
            Momento Sagrado
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2C302E] tracking-tight mt-1 sm:mt-2 mb-3 sm:mb-4">
            {titulo}
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-[#C5A880]/50 mx-auto" />
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E8DFD5] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Foto da Igreja */}
          <div className="lg:col-span-6 relative min-h-[200px] sm:min-h-[280px] lg:min-h-full">
            <Image
              src={foto}
              alt={titulo}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Informações e Mapa */}
          <div className="lg:col-span-6 p-5 sm:p-8 md:p-10 flex flex-col justify-between">
            <div>
              {/* Badges de Data e Hora */}
              <div className="flex flex-wrap gap-2.5 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#EBF3F0] text-[#52796F] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{data}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#F7F2EA] text-[#A6865A] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{horario}</span>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#52796F] shrink-0 mt-1" />
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-semibold text-[#2C302E]">Local da Celebração</h3>
                  <p className="text-xs sm:text-sm text-[#6B7280] font-sans leading-relaxed">{endereco}</p>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-xs sm:text-sm text-[#2C302E]/80 leading-relaxed font-sans mb-4 sm:mb-6">
                {descricao}
              </p>

              {/* Mapa Interativo Incorporado */}
              <div className="w-full h-36 sm:h-44 rounded-xl overflow-hidden border border-[#E8DFD5] mb-4 sm:mb-6 shadow-inner">
                <iframe
                  title="Mapa da Cerimônia"
                  src={embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen={false}
                />
              </div>
            </div>

            {/* Botão COMO CHEGAR */}
            <a
              id="btn-como-chegar-cerimonia"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-6 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>COMO CHEGAR</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
