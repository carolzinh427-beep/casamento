'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Nossa História', href: '#historia' },
    { name: 'Cerimônia', href: '#cerimonia' },
    { name: 'Recepção', href: '#recepcao' },
    { name: 'Galeria', href: '#galeria' },
    { name: 'Lista de Presentes', href: '#presentes' },
    { name: 'Confirmar Presença', href: '#rsvp' },
    { name: 'Recados', href: '#recados' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFD5]/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Monograma / Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-serif text-xl sm:text-2xl font-semibold text-[#2C302E] tracking-tight group-hover:text-[#52796F] transition-colors">
            A <span className="text-[#C5A880] font-script text-2xl sm:text-3xl">&</span> H
          </span>
        </a>

        {/* Links Desktop */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs uppercase tracking-[0.18em] text-[#2C302E]/80 hover:text-[#52796F] font-medium transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-[#C5A880] after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Botão Mobile Menu */}
        <button
          id="btn-mobile-menu"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          className="lg:hidden p-2 rounded-lg text-[#2C302E] hover:bg-[#E8DFD5]/40 transition-colors cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#FAF7F2] border-b border-[#E8DFD5] shadow-xl px-6 py-8 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-center mb-2">
            <Heart className="w-5 h-5 text-[#C5A880] fill-[#C5A880]/20" />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm uppercase tracking-[0.2em] text-[#2C302E] hover:text-[#52796F] py-2.5 text-center font-medium border-b border-[#E8DFD5]/40 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
