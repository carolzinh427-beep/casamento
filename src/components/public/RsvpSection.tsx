'use client';

import React, { useState } from 'react';
import { Check, Heart, Send, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RsvpSection() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [presente, setPresente] = useState(true);
  const [adultos, setAdultos] = useState(1);
  const [criancas, setCriancas] = useState(0);
  const [acompanhante, setAcompanhante] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Máscara de telefone brasileira
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);

    if (val.length > 10) {
      val = val.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (val.length > 6) {
      val = val.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (val.length > 2) {
      val = val.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    }
    setTelefone(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          telefone,
          presente,
          adultos: presente ? adultos : 0,
          criancas: presente ? criancas : 0,
          acompanhante: presente ? acompanhante : '',
          observacoes,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        if (presente) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#52796F', '#C5A880', '#2C302E'],
          });
        }
        setSubmittedMessage(data.message || 'Sua confirmação foi registrada com sucesso!');
      } else {
        setErrorMessage(data.error || 'Erro ao enviar confirmação. Verifique os dados.');
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro de comunicação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 md:py-28 bg-[#FAF7F2] border-t border-[#E8DFD5]/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#52796F] font-sans font-semibold">
            Sua Presença
          </span>
          <h2 className="text-4xl sm:text-5xl font-serif text-[#2C302E] tracking-tight mt-2 mb-4">
            Confirme sua Presença
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880]/50 mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#6B7280] font-sans leading-relaxed">
            Sua presença é essencial para nós! Por favor, confirme se você e seus acompanhantes poderão comparecer para que possamos organizar cada detalhe com muito carinho.
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E8DFD5] relative">
          {submittedMessage ? (
            <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-[#EBF3F0] text-[#52796F] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#2C302E] mb-3">
                Resposta Enviada com Sucesso!
              </h3>
              <p className="text-[#6B7280] font-sans max-w-md mx-auto leading-relaxed mb-8">
                {submittedMessage}
              </p>
              <button
                onClick={() => {
                  setSubmittedMessage(null);
                  setNome('');
                  setEmail('');
                  setTelefone('');
                  setAcompanhante('');
                  setObservacoes('');
                }}
                className="px-6 py-2.5 rounded-full border border-[#52796F] text-[#52796F] text-xs font-semibold uppercase tracking-wider hover:bg-[#52796F] hover:text-white transition-colors cursor-pointer"
              >
                Enviar Outra Confirmação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Honeypot Invisível Anti-Spam */}
              <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />

              {/* Nome Completo */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                  Nome Completo *
                </label>
                <input
                  id="rsvp-nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome e sobrenome"
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white transition-all"
                />
              </div>

              {/* Grid: E-mail e Telefone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                    E-mail <span className="text-[#6B7280] font-normal lowercase">(opcional)</span>
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com (opcional)"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                    Telefone com DDD *
                  </label>
                  <input
                    id="rsvp-telefone"
                    type="tel"
                    required
                    value={telefone}
                    onChange={handlePhoneChange}
                    placeholder="(61) 99999-9999"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Você vai comparecer? */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-3">
                  Você irá ao casamento? *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPresente(true)}
                    className={`p-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer ${
                      presente
                        ? 'bg-[#EBF3F0] border-[#52796F] text-[#52796F] shadow-xs'
                        : 'bg-white border-[#E8DFD5] text-[#6B7280] hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        presente ? 'border-[#52796F] bg-[#52796F]' : 'border-gray-400'
                      }`}
                    >
                      {presente && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span>Sim, irei com certeza! 🎉</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPresente(false)}
                    className={`p-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-3 transition-all cursor-pointer ${
                      !presente
                        ? 'bg-[#F7F2EA] border-[#C5A880] text-[#A6865A] shadow-xs'
                        : 'bg-white border-[#E8DFD5] text-[#6B7280] hover:border-gray-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        !presente ? 'border-[#C5A880] bg-[#C5A880]' : 'border-gray-400'
                      }`}
                    >
                      {!presente && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span>Infelizmente não poderei 😢</span>
                  </button>
                </div>
              </div>

              {/* Campos condicionais se a resposta for "Sim" */}
              {presente && (
                <div className="space-y-6 pt-2 border-t border-[#E8DFD5]/60 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                        Quantidade de Adultos (incluindo você)
                      </label>
                      <select
                        id="rsvp-adultos"
                        value={adultos}
                        onChange={(e) => setAdultos(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Adulto' : 'Adultos'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                        Quantidade de Crianças (até 10 anos)
                      </label>
                      <select
                        id="rsvp-criancas"
                        value={criancas}
                        onChange={(e) => setCriancas(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white"
                      >
                        {[0, 1, 2, 3, 4].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? 'Criança' : 'Crianças'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {adultos > 1 && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                        Nome do(s) Acompanhante(s)
                      </label>
                      <input
                        id="rsvp-acompanhante"
                        type="text"
                        value={acompanhante}
                        onChange={(e) => setAcompanhante(e.target.value)}
                        placeholder="Nome completo do cônjuge ou acompanhante"
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Observações */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                  Observações ou Restrições Alimentares (Opcional)
                </label>
                <textarea
                  id="rsvp-observacoes"
                  rows={3}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Alguma restrição alimentar ou recado para a organização..."
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white"
                />
              </div>

              {/* Botão de Envio */}
              <div className="pt-4">
                <button
                  id="btn-enviar-rsvp"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-8 rounded-full bg-[#52796F] hover:bg-[#354F52] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-xl disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Enviando...' : 'CONFIRMAR PRESENÇA'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
