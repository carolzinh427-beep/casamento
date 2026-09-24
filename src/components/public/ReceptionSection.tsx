import React from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Clock, Navigation, Wine } from 'lucide-react';

interface ReceptionSectionProps {
  titulo?: string;
  data?: string;
  horario?: string;
  endereco?: string;
  descricao?: string;
  mapsUrl?: string;
  foto?: string;
}

export default function ReceptionSection({
  titulo = 'Recepção dos Noivos',
  data = '20 de Novembro de 2026',
  horario = 'Após a Cerimônia',
  endereco = 'Salão de Festas do Restaurante NAU Frutos do Mar, Setor de Clubes Esportivos Sul, Brasília - DF, CEP: 70297-400',
  descricao = 'Após a cerimônia, teremos a alegria de recebê-los para a nossa recepção, que acontecerá em um espaço reservado exclusivamente para a celebração do nosso casamento. Preparamos este momento com muito carinho para comemorarmos juntos, com um jantar especial e muita alegria.',
  mapsUrl = 'https://maps.google.com/?q=Restaurante+NAU+Frutos+do+Mar+Brasília',
  foto = '/images/nau-brasilia.jpg',
}: ReceptionSectionProps) {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="recepcao" className="py-10 md:py-16 lg:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-sans font-semibold">
            Celebração & Jantar
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2C302E] tracking-tight mt-1 sm:mt-2 mb-3 sm:mb-4">
            {titulo}
          </h2>
          <div className="w-12 sm:w-16 h-0.5 bg-[#C5A880]/50 mx-auto" />
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-[#E8DFD5] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Informações e Mapa (Invertido em relação à Cerimônia no desktop para visual elegante) */}
          <div className="lg:col-span-6 p-5 sm:p-8 md:p-10 flex flex-col justify-between order-2 lg:order-1">
            <div>
              {/* Badges de Data e Hora */}
              <div className="flex flex-wrap gap-2.5 sm:gap-4 mb-4 sm:mb-6">
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#EBF3F0] text-[#52796F] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{data}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#F7F2EA] text-[#A6865A] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Wine className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{horario}</span>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h3 className="text-base sm:text-lg font-serif font-semibold text-[#2C302E]">Local da Festa</h3>
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
                  title="Mapa da Recepção"
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
              id="btn-como-chegar-recepcao"
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3 sm:py-3.5 px-6 rounded-full bg-[#C5A880] hover:bg-[#A6865A] text-white text-xs font-semibold tracking-[0.18em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>COMO CHEGAR</span>
            </a>
          </div>

          {/* Foto do Salão de Festas (Restaurante NAU Frutos do Mar) */}
          <div className="lg:col-span-6 relative w-full h-64 sm:h-80 lg:h-full min-h-[240px] sm:min-h-[300px] order-1 lg:order-2 bg-[#FAF7F2] overflow-hidden group">
            <Image
              src={foto}
              alt="Restaurante NAU Frutos do Mar - Local da Festa"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-3 left-4 right-4 text-white lg:hidden">
              <span className="text-xs font-serif tracking-wider drop-shadow-md">
                Restaurante NAU Frutos do Mar
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
