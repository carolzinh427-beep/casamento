'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setErrorMsg(data.error || 'Credenciais inválidas. Verifique usuário e senha.');
      }
    } catch {
      setErrorMsg('Erro de conexão ao tentar fazer login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full">
        {/* Card de Login */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#E8DFD5] relative overflow-hidden">
          {/* Detalhe superior */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#52796F] via-[#C5A880] to-[#52796F]" />

          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-[#EBF3F0] text-[#52796F] flex items-center justify-center mx-auto mb-4 border border-[#52796F]/20">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C5A880] font-sans font-semibold">
              Acesso Reservado
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif text-[#2C302E] font-bold mt-1">
              Painel dos Noivos
            </h1>
            <p className="text-xs text-[#6B7280] font-sans mt-2">
              Amanda & Hugo • Gestão do Casamento
            </p>
          </div>

          {errorMsg && (
            <div className="p-3.5 mb-6 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium animate-in fade-in">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="admin-username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nome de usuário"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C302E] mb-2">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha secreta"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF7F2]/50 border border-[#E8DFD5] text-[#2C302E] text-sm focus:outline-none focus:ring-2 focus:ring-[#52796F] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              id="btn-admin-login"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#52796F] hover:bg-[#354F52] text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              <span>{isLoading ? 'Autenticando...' : 'ENTRAR NO PAINEL'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-[11px] text-[#6B7280] flex items-center justify-center gap-1.5 font-sans">
            <span>Área estritamente restrita</span>
            <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
            <span>Casamento Amanda & Hugo</span>
          </p>
        </div>
      </div>
    </div>
  );
}
