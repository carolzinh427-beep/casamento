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
  foto = '/images/recepcao.jpg',
}: ReceptionSectionProps) {
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(endereco)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="recepcao" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-sans font-semibold">
            Celebração & Jantar
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#2C302E] tracking-tight mt-2 mb-4">
            {titulo}
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880]/50 mx-auto" />
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E8DFD5] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Informações e Mapa (Invertido em relação à Cerimônia no desktop para visual elegante) */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between order-2 lg:order-1">
            <div>
              {/* Badges de Data e Hora */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EBF3F0] text-[#52796F] text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-4 h-4" />
                  <span>{data}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7F2EA] text-[#A6865A] text-xs font-semibold uppercase tracking-wider">
                  <Wine className="w-4 h-4" />
                  <span>{horario}</span>
                </div>
              </div>

              {/* Endereço */}
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="w-5 h-5 text-[#C5A880] shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-serif font-semibold text-[#2C302E]">Local da Festa</h3>
                  <p className="text-sm text-[#6B7280] font-sans leading-relaxed">{endereco}</p>
                </div>
              </div>

              {/* Descrição */}
              <p className="text-sm text-[#2C302E]/80 leading-relaxed font-sans mb-8">
                {descricao}
              </p>

              {/* Mapa Interativo Incorporado */}
              <div className="w-full h-48 rounded-xl overflow-hidden border border-[#E8DFD5] mb-6 shadow-inner">
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
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#C5A880] hover:bg-[#A6865A] text-white text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              <span>COMO CHEGAR</span>
            </a>
          </div>

          {/* Foto do Salão de Festas */}
          <div className="lg:col-span-6 relative min-h-[300px] sm:min-h-[380px] lg:min-h-full order-1 lg:order-2">
            <Image
              src={foto}
              alt={titulo}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
