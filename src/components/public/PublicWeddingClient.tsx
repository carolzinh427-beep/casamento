'use client';

import React, { useState } from 'react';
import EntranceScreen from './EntranceScreen';
import MusicPlayer from './MusicPlayer';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import StorySection from './StorySection';
import CeremonySection from './CeremonySection';
import ReceptionSection from './ReceptionSection';
import GallerySection from './GallerySection';
import GiftListSection from './GiftListSection';
import RsvpSection from './RsvpSection';
import MessageWallSection from './MessageWallSection';
import Footer from './Footer';

interface PublicWeddingClientProps {
  casamento: {
    nomeNoiva: string;
    nomeNoivo: string;
    data: string;
    mensagemInicial: string;
    historia: string;
    musicaUrl: string;
  };
  cerimonia?: {
    titulo: string;
    data: string;
    horario: string;
    endereco: string;
    descricao: string;
    mapsUrl: string;
    foto?: string | null;
  };
  recepcao?: {
    titulo: string;
    data: string;
    horario: string;
    endereco: string;
    descricao: string;
    mapsUrl: string;
    foto?: string | null;
  };
  fotos: Array<{
    id: string;
    url: string;
    legenda?: string | null;
    principal?: boolean;
  }>;
  presentes: Array<{
    id: string;
    nome: string;
    categoria?: string;
    descricao: string;
    imagem: string;
    valor: number;
    disponivel: boolean;
  }>;
  recados: Array<{
    id: string;
    nome: string;
    mensagem: string;
    createdAt: string;
  }>;
}

export default function PublicWeddingClient({
  casamento,
  cerimonia,
  recepcao,
  fotos,
  presentes,
  recados,
}: PublicWeddingClientProps) {
  const [hasEntered, setHasEntered] = useState(false);

  const heroPhoto = fotos.find((f) => f.principal)?.url || '/images/hero.jpg';
  const historiaPhoto1 = fotos[1]?.url || '/images/historia-01.jpg';
  const historiaPhoto2 = fotos[2]?.url || '/images/historia-02.jpg';

  return (
    <div className="relative min-h-screen">
      {/* 1. Tela de Entrada que desbloqueia a reprodução de áudio ao clicar em ENTRAR ♫ */}
      <EntranceScreen
        onEnter={() => setHasEntered(true)}
        brideName={casamento.nomeNoiva}
        groomName={casamento.nomeNoivo}
        weddingDateFormatted="20.11.2026"
      />

      {/* 2. Player de Áudio Global Persistente com botão flutuante ♫ / ❚❚ */}
      <MusicPlayer src={casamento.musicaUrl} autoPlayTrigger={hasEntered} />

      {/* 3. Barra de Navegação Flutuante */}
      <Navbar />

      {/* 4. Conteúdo Principal em Seções */}
      <main className="relative">
        <HeroSection
          brideName={casamento.nomeNoiva}
          groomName={casamento.nomeNoivo}
          weddingDateIso={casamento.data}
          initialMessage={casamento.mensagemInicial}
          heroImage={heroPhoto}
        />

        <StorySection
          storyText={casamento.historia}
          image1={historiaPhoto1}
          image2={historiaPhoto2}
        />

        <CeremonySection
          titulo={cerimonia?.titulo}
          data={cerimonia?.data}
          horario={cerimonia?.horario}
          endereco={cerimonia?.endereco}
          descricao={cerimonia?.descricao}
          mapsUrl={cerimonia?.mapsUrl}
          foto={cerimonia?.foto || '/images/cerimonia.jpg'}
        />

        <ReceptionSection
          titulo={recepcao?.titulo}
          data={recepcao?.data}
          horario={recepcao?.horario}
          endereco={recepcao?.endereco}
          descricao={recepcao?.descricao}
          mapsUrl={recepcao?.mapsUrl}
          foto={recepcao?.foto || '/images/nau-brasilia.jpg'}
        />

        <GallerySection fotos={fotos} />

        <GiftListSection presentes={presentes} />

        <RsvpSection />

        <MessageWallSection recadosIniciais={recados} />
      </main>

      {/* 5. Rodapé Limpo (sem links admin) */}
      <Footer />
    </div>
  );
}
