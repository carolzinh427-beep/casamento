import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';

interface StorySectionProps {
  storyText?: string;
  image1?: string;
  image2?: string;
}

export default function StorySection({
  storyText,
  image1 = '/images/historia-01.jpg',
  image2 = '/images/historia-02.jpg',
}: StorySectionProps) {
  const defaultStory =
    'Nossa história começou há alguns anos, num dia em que nada parecia diferente, até que um olhar e uma conversa mudaram tudo. Descobrimos no outro a paz de um lar, o riso fácil nos dias comuns e a cumplicidade que nos faz sonhar juntos. Construímos planos, compartilhamos momentos inesquecíveis e aprendemos que o amor verdadeiro é feito de cuidado, respeito e admiração mútua. Agora, estamos prontos para dar o passo mais importante das nossas vidas: celebrar a nossa união para sempre perante Deus e as pessoas que mais amamos.';

  return (
    <section id="historia" className="py-10 md:py-16 lg:py-20 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#C5A880] font-sans font-semibold">
            Capítulo I
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2C302E] tracking-tight mt-1 sm:mt-2 mb-3 sm:mb-4">
            Nossa História
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 sm:w-10 h-px bg-[#C5A880]/50" />
            <Heart className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]/30" />
            <div className="w-8 sm:w-10 h-px bg-[#C5A880]/50" />
          </div>
        </div>

        {/* Layout da História */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Coluna de Imagens com Composição Artística */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full max-w-xs sm:max-w-md mx-auto">
              {/* Foto Principal da História */}
              <div className="relative aspect-[4/3] sm:aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden shadow-lg border-2 sm:border-4 border-white bg-gray-100 z-10">
                <Image
                  src={image1}
                  alt="Amanda & Hugo juntos"
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Foto Secundária Sobreposta */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-3/5 aspect-square rounded-xl overflow-hidden shadow-xl border-4 border-white bg-gray-200 z-20">
                <Image
                  src={image2}
                  alt="Amanda & Hugo momento especial"
                  fill
                  sizes="300px"
                  className="object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Detalhe de fundo floral/geométrico */}
              <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-full h-full border border-[#C5A880]/30 rounded-xl sm:rounded-2xl -z-10" />
            </div>
          </div>

          {/* Coluna de Texto */}
          <div className="lg:col-span-6 lg:pl-4">
            <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[#52796F] block mb-2">
              Como tudo começou...
            </span>

            <p className="text-sm sm:text-base text-[#2C302E]/90 leading-relaxed font-sans font-light text-justify mb-6 sm:mb-8 whitespace-pre-line">
              {storyText || defaultStory}
            </p>

            {/* Destaque Romântico */}
            <div className="border-l-2 border-[#C5A880] pl-4 sm:pl-6 py-2 bg-[#F7F2EA]/40 rounded-r-xl">
              <p className="font-serif italic text-sm sm:text-base md:text-lg text-[#2C302E]">
                &quot;O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Tudo sofre, tudo crê, tudo espera, tudo suporta.&quot;
              </p>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#6B7280] font-sans block mt-1 sm:mt-2">
                1 Coríntios 13:4-7
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
