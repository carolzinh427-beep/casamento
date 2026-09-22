'use client';

import React, { useState } from 'react';
import { MessageSquare, Heart, Send, CheckCircle2, Clock } from 'lucide-react';

interface RecadoItem {
  id: string;
  nome: string;
  mensagem: string;
  createdAt: string;
}

interface MessageWallSectionProps {
  recadosIniciais?: RecadoItem[];
}

export default function MessageWallSection({ recadosIniciais = [] }: MessageWallSectionProps) {
  const [recados, setRecados] = useState<RecadoItem[]>(recadosIniciais);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successFeedback, setSuccessFeedback] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !mensagem.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/recados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: nome.trim(),
          mensagem: mensagem.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessFeedback(true);
        setNome('');
        setMensagem('');
        setTimeout(() => setSuccessFeedback(false), 8000);
      } else {
        setErrorMsg(data.error || 'Erro ao enviar recado.');
      }
    } catch {
      setErrorMsg('Erro de conexão ao enviar recado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="recados" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C5A880] font-sans font-semibold">
            Palavras de Afeto
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#2C302E] tracking-tight mt-2 mb-4">
            Mural de Recados
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#6B7280] font-sans leading-relaxed">
            Deixe uma mensagem especial para Amanda & Hugo. Cada palavra de bênção e carinho ficará guardada para sempre em nossas memórias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Formulário de Envio */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#E8DFD5] sticky top-28">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#F7F2EA] text-[#A6865A] flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#2C302E]">
                    Escreva para os Noivos
                  </h3>
                  <p className="text-xs text-[#6B7280]">Envie seus votos de felicidade</p>
                </div>
              </div>

              {successFeedback && (
                <div className="p-4 mb-4 rounded-xl bg-[#EBF3F0] border border-[#52796F]/30 text-[#52796F] text-xs leading-relaxed animate-in fade-in flex items-start gap-2.5">
                  <Clock className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recado enviado com sucesso!</strong> Ele passará por moderação dos noivos e aparecerá no mural em breve. Muito obrigado!
                  </span>
                </div>
              )}

              {errorMsg && (
                <div className="p-3.5 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot */}
                <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                    Seu Nome *
                  </label>
                  <input
                    id="recado-nome"
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Ex: Família Silva ou Ana Clara"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-1.5">
                    Sua Mensagem *
                  </label>
                  <textarea
                    id="recado-mensagem"
                    required
                    rows={4}
                    maxLength={800}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Escreva seus votos aos noivos..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white"
                  />
                  <div className="flex justify-between text-[11px] text-[#6B7280] mt-1 font-sans">
                    <span>{mensagem.length}/800 caracteres</span>
                    <span>Moderação prévia pelos noivos</span>
                  </div>
                </div>

                <button
                  id="btn-enviar-recado"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Enviando...' : 'ENVIAR RECADO'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Lista de Recados Aprovados */}
          <div className="lg:col-span-7">
            {recados.length === 0 ? (
              <div className="bg-white/60 rounded-3xl p-12 text-center border border-[#E8DFD5] text-[#6B7280]">
                <Heart className="w-8 h-8 text-[#C5A880] mx-auto mb-3 opacity-60" />
                <p className="font-serif text-lg text-[#2C302E] mb-1">
                  Seja o primeiro a deixar uma mensagem!
                </p>
                <p className="text-xs">Os recados aprovados aparecerão aqui para todos celebrarem.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {recados.map((recado) => (
                  <div
                    key={recado.id}
                    className="bg-white rounded-2xl p-6 sm:p-7 shadow-xs border border-[#E8DFD5] transition-all hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-3 border-b border-[#E8DFD5]/40 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EBF3F0] text-[#52796F] flex items-center justify-center font-serif font-bold text-sm">
                          {recado.nome.charAt(0).toUpperCase()}
                        </div>
                        <h4 className="font-serif font-semibold text-[#2C302E] text-base">
                          {recado.nome}
                        </h4>
                      </div>
                      <span className="text-[11px] text-[#6B7280] font-sans">
                        {new Date(recado.createdAt).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: 'short',
                        })}
                      </span>
                    </div>

                    <p className="text-sm text-[#2C302E]/85 font-sans leading-relaxed whitespace-pre-line italic">
                      &quot;{recado.mensagem}&quot;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
