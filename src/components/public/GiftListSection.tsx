'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Gift, CheckCircle2, Heart, X, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PresenteItem {
  id: string;
  nome: string;
  categoria?: string;
  descricao: string;
  imagem: string;
  valor: number;
  disponivel: boolean;
}

interface GiftListSectionProps {
  presentes: PresenteItem[];
}

export default function GiftListSection({ presentes: initialPresentes = [] }: GiftListSectionProps) {
  const [presentes, setPresentes] = useState<PresenteItem[]>(initialPresentes);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const INITIAL_ITEMS = 8;
  const [activeGift, setActiveGift] = useState<PresenteItem | null>(null);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState<{ isOpen: boolean; giftName: string }>({
    isOpen: false,
    giftName: '',
  });

  const categories = ['Todas', ...Array.from(new Set(presentes.map((p) => p.categoria || 'Geral')))];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setIsExpanded(false);
  };

  const filteredPresentes =
    selectedCategory === 'Todas'
      ? presentes
      : presentes.filter((p) => (p.categoria || 'Geral') === selectedCategory);

  const visiblePresentes = isExpanded
    ? filteredPresentes
    : filteredPresentes.slice(0, INITIAL_ITEMS);

  const hasMore = filteredPresentes.length > INITIAL_ITEMS;
  const remainingCount = filteredPresentes.length - INITIAL_ITEMS;

  const handleOpenModal = (presente: PresenteItem) => {
    setActiveGift(presente);
    setGuestName('');
    setGuestMessage('');
  };

  const handleCloseModal = () => {
    setActiveGift(null);
  };

  const handleConfirmGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeGift || !guestName.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/presentes/${activeGift.id}/escolher`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: guestName.trim(),
          mensagem: guestMessage.trim(),
        }),
      });

      if (res.ok) {
        // Atualiza a lista local marcando como indisponível
        setPresentes((prev) =>
          prev.map((p) => (p.id === activeGift.id ? { ...p, disponivel: false } : p))
        );

        // Confetti festivo
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#52796F', '#C5A880', '#FAF7F2'],
        });

        const giftName = activeGift.nome;
        setActiveGift(null);
        setSuccessModal({ isOpen: true, giftName });
      } else {
        alert('Não foi possível registrar o presente. Tente novamente.');
      }
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao registrar a escolha.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="presentes" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#52796F] font-sans font-semibold">
            Gesto de Carinho
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#2C302E] tracking-tight mt-2 mb-4">
            Lista de Presentes
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#6B7280] font-sans leading-relaxed">
            A presença de vocês é o maior presente que poderíamos receber. Caso queiram nos agraciar com um mimo para a nossa nova vida a dois, preparamos com carinho as opções abaixo.
          </p>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#52796F] text-white shadow-sm'
                  : 'bg-white text-[#6B7280] border border-[#E8DFD5] hover:border-[#52796F]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Presentes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {visiblePresentes.map((presente) => (
            <div
              key={presente.id}
              className={`bg-white rounded-2xl overflow-hidden border border-[#E8DFD5] shadow-xs flex flex-col justify-between transition-all duration-300 ${
                presente.disponivel
                  ? 'hover:shadow-xl hover:-translate-y-1'
                  : 'opacity-70 bg-gray-50/70'
              }`}
            >
              <div>
                {/* Imagem do Presente */}
                <div className="relative aspect-[4/3] w-full bg-[#FAF7F2] overflow-hidden border-b border-[#E8DFD5]/40">
                  <Image
                    src={presente.imagem}
                    alt={presente.nome}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                  {/* Badge de Disponibilidade */}
                  <div className="absolute top-3 right-3">
                    {presente.disponivel ? (
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-white/90 text-[#52796F] backdrop-blur-xs shadow-xs border border-[#52796F]/20">
                        Disponível
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-[#2C302E]/80 text-white backdrop-blur-xs">
                        Presenteado ❤️
                      </span>
                    )}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                    {presente.categoria || 'Casamento'}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-[#2C302E] leading-snug line-clamp-2 mb-2">
                    {presente.nome}
                  </h3>
                  <p className="text-xs text-[#6B7280] line-clamp-2 mb-4 leading-relaxed">
                    {presente.descricao}
                  </p>
                </div>
              </div>

              {/* Rodapé do Card com Preço e Botão */}
              <div className="p-5 pt-0">
                <div className="mb-4">
                  <span className="text-[11px] text-[#6B7280] block uppercase tracking-wider">
                    Valor sugerido
                  </span>
                  <span className="text-xl font-serif font-bold text-[#52796F]">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(presente.valor)}
                  </span>
                </div>

                {presente.disponivel ? (
                  <button
                    id={`btn-escolher-${presente.id}`}
                    onClick={() => handleOpenModal(presente)}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#52796F] hover:bg-[#354F52] text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>ESCOLHER PRESENTE</span>
                  </button>
                ) : (
                  <div className="w-full py-2.5 px-4 rounded-xl bg-gray-100 text-[#6B7280] text-xs font-semibold uppercase tracking-wider text-center select-none flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#52796F]" />
                    <span>Já Presenteado</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Botão de Ler Mais / Carregar Catálogo Completo */}
        {hasMore && (
          <div className="mt-14 text-center">
            {!isExpanded ? (
              <div className="flex flex-col items-center gap-3">
                <button
                  id="btn-ler-mais-presentes"
                  onClick={() => setIsExpanded(true)}
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white font-serif text-sm tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>LER MAIS — CARREGAR CATÁLOGO COMPLETO</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                </button>
                <span className="text-xs text-[#6B7280] font-sans">
                  Mostrando {INITIAL_ITEMS} de {filteredPresentes.length} presentes disponíveis (+{remainingCount} opções)
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    setIsExpanded(false);
                    const el = document.getElementById('presentes');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-[#6B7280] border border-[#E8DFD5] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs"
                >
                  <span>Mostrar Menos</span>
                  <ChevronUp className="w-3.5 h-3.5" />
                </button>
                <span className="text-xs text-[#52796F] font-sans font-medium">
                  ✓ Todos os {filteredPresentes.length} presentes carregados
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal para Escolher Presente */}
      {activeGift && (
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E8DFD5] shadow-2xl relative animate-in zoom-in-95 duration-200"
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 p-2 rounded-full text-[#6B7280] hover:text-[#2C302E] hover:bg-[#E8DFD5]/40 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-full bg-[#EBF3F0] text-[#52796F] flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-semibold">
                Presentear Amanda & Hugo
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C302E] mt-1">
                {activeGift.nome}
              </h3>
              <p className="text-lg font-serif font-bold text-[#52796F] mt-1">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(activeGift.valor)}
              </p>
            </div>

            <form onSubmit={handleConfirmGift} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                  Seu Nome Completo *
                </label>
                <input
                  id="input-guest-name-presente"
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ex: Maria Clara de Souza"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                  Mensagem de Carinho (Opcional)
                </label>
                <textarea
                  id="input-guest-message-presente"
                  rows={3}
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  placeholder="Deixe uma mensagem que será entregue aos noivos..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Registrando...' : 'CONFIRMAR PRESENTE'}
                </button>
              </div>

              <p className="text-[11px] text-[#6B7280] text-center font-sans">
                Seus dados não serão exibidos publicamente na lista.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Sucesso */}
      {successModal.isOpen && (
        <div
          onClick={() => setSuccessModal({ isOpen: false, giftName: '' })}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FAF7F2] rounded-3xl max-w-sm w-full p-8 border border-[#E8DFD5] shadow-2xl text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#EBF3F0] text-[#52796F] flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#2C302E] mb-2">
              Muito Obrigado!
            </h3>
            <p className="text-sm text-[#6B7280] font-sans leading-relaxed mb-6">
              Sua escolha de <strong className="text-[#2C302E]">{successModal.giftName}</strong> foi registrada com sucesso. Amanda & Hugo agradecem de todo coração pelo seu carinho!
            </p>
            <button
              onClick={() => setSuccessModal({ isOpen: false, giftName: '' })}
              className="w-full py-3 px-6 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white font-semibold text-xs uppercase tracking-[0.15em] transition-all cursor-pointer"
            >
              FECHAR
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
