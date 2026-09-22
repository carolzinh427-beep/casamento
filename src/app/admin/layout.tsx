'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Heart, Home, Gift, Users, MessageSquare, Image as ImageIcon, Settings } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F4EFEA] text-[#2C302E]">
      {/* Top Bar Administrativa */}
      <header className="bg-white border-b border-[#E8DFD5] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#52796F] text-white flex items-center justify-center font-serif font-bold text-sm">
              A&H
            </div>
            <div>
              <span className="font-serif font-bold text-base text-[#2C302E] block leading-tight">
                Amanda & Hugo
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#C5A880] font-semibold">
                Painel Administrativo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="btn-admin-logout"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#E8DFD5] text-xs font-semibold text-[#6B7280] hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
