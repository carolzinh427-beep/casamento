'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface FotoItem {
  id: string;
  url: string;
  legenda?: string | null;
  principal?: boolean;
}

interface GallerySectionProps {
  fotos?: FotoItem[];
}

export default function GallerySection({ fotos = [] }: GallerySectionProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null || fotos.length === 0) return;
    setSelectedPhotoIndex((selectedPhotoIndex + 1) % fotos.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null || fotos.length === 0) return;
    setSelectedPhotoIndex((selectedPhotoIndex - 1 + fotos.length) % fotos.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, fotos.length]);

  return (
    <section id="galeria" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#52796F] font-sans font-semibold">
            Registros Especiais
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#2C302E] tracking-tight mt-2 mb-4">
            Galeria do Casal
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880]/50 mx-auto" />
        </div>

        {/* Grid de Fotos Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {fotos.map((foto, index) => (
            <div
              key={foto.id}
              onClick={() => openLightbox(index)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white border border-[#E8DFD5] cursor-pointer hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
            >
              <Image
                src={foto.url}
                alt={foto.legenda || 'Foto do casamento'}
                fill
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex items-center justify-between w-full text-white">
                  <p className="text-sm font-serif truncate pr-4">
                    {foto.legenda || 'Amanda & Hugo'}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
                    <Maximize2 className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal com Zoom e Navegação */}
      {selectedPhotoIndex !== null && fotos[selectedPhotoIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
        >
          {/* Botão Fechar */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            aria-label="Fechar galeria"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Botão Foto Anterior */}
          {fotos.length > 1 && (
            <button
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all hover:scale-110 cursor-pointer"
              aria-label="Foto anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Imagem Ampliada */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
          >
            <div className="relative w-full h-[75vh]">
              <Image
                src={fotos[selectedPhotoIndex].url}
                alt={fotos[selectedPhotoIndex].legenda || 'Foto do casamento ampliada'}
                fill
                className="object-contain"
                priority
              />
            </div>
            {fotos[selectedPhotoIndex].legenda && (
              <p className="text-center text-white/90 font-serif text-lg mt-4 max-w-2xl px-4">
                {fotos[selectedPhotoIndex].legenda}
              </p>
            )}
            <span className="text-xs text-white/50 font-sans tracking-widest uppercase mt-2">
              {selectedPhotoIndex + 1} de {fotos.length}
            </span>
          </div>

          {/* Botão Próxima Foto */}
          {fotos.length > 1 && (
            <button
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/15 hover:bg-white/30 text-white transition-all hover:scale-110 cursor-pointer"
              aria-label="Próxima foto"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </section>
  );
}
