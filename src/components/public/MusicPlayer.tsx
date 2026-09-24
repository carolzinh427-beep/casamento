'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface MusicPlayerProps {
  src?: string;
  autoPlayTrigger?: boolean;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

function extractYouTubeId(url?: string): string {
  if (!url) return 'ODRWKGIxB4M';
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  return 'ODRWKGIxB4M'; // Dan + Shay - From The Ground Up (Música Oficial)
}

export default function MusicPlayer({
  src = 'https://www.youtube.com/watch?v=ODRWKGIxB4M',
  autoPlayTrigger = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const ytPlayerRef = useRef<any>(null);
  const pendingPlayRef = useRef(false);

  // Música oficial exclusiva: Dan + Shay - From The Ground Up
  const youtubeId = extractYouTubeId(src);

  // Inicializa o player com as configurações oficiais do site de referência (casar.com)
  useEffect(() => {
    let isCancelled = false;

    const initPlayer = () => {
      if (isCancelled || !window.YT || !window.YT.Player) return;

      try {
        ytPlayerRef.current = new window.YT.Player('sdn-youtube-player', {
          height: '200',
          width: '200',
          videoId: youtubeId,
          playerVars: {
            enablejsapi: 1,
            playsinline: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: youtubeId,
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              if (isCancelled) return;
              event.target.setVolume(75);
              if (pendingPlayRef.current) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              if (isCancelled) return;
              // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              } else if (event.data === 0) {
                // Loop contínuo
                event.target.playVideo();
              }
            },
          },
        });
      } catch (err) {
        console.warn('Player init:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };

      if (!document.getElementById('youtube-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }

    return () => {
      isCancelled = true;
      if (ytPlayerRef.current?.destroy) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [youtubeId]);

  // Iniciar reprodução da música oficial "From The Ground Up"
  const startPlaying = useCallback(() => {
    setHasInteracted(true);

    if (ytPlayerRef.current?.playVideo) {
      try {
        ytPlayerRef.current.playVideo();
        setIsPlaying(true);
      } catch (e) {
        console.warn('Erro ao tocar vídeo:', e);
      }
    } else {
      pendingPlayRef.current = true;
    }
  }, []);

  // Disparo automático ao clicar em "ENTRAR ♫" na tela de abertura
  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted) {
      startPlaying();
    }
  }, [autoPlayTrigger, hasInteracted, startPlaying]);

  // Alternar entre tocar e pausar
  const togglePlay = () => {
    if (isPlaying) {
      if (ytPlayerRef.current?.pauseVideo) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {
          // ignore
        }
      }
      setIsPlaying(false);
    } else {
      startPlaying();
    }
  };

  return (
    <>
      {/* Container invisível posicionado fora da tela para o player do YouTube rodar sem restrições */}
      <div
        id="sdn-music-player-wrap"
        className="fixed -top-[600px] -left-[600px] w-[200px] h-[200px] opacity-1 pointer-events-none overflow-hidden"
        style={{ zIndex: -999 }}
        aria-hidden="true"
      >
        <div id="sdn-youtube-player" />
      </div>

      {/* Botão flutuante no canto inferior direito */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="btn-music-toggle"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar: Dan + Shay — From The Ground Up' : 'Tocar: Dan + Shay — From The Ground Up'}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#2C302E] shadow-xl border border-[#C5A880]/50 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <div className="flex items-center gap-1">
              <span className="text-base text-[#52796F] font-bold select-none leading-none">♫</span>
              {/* Barrinhas animadas de equalizador */}
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-full bg-[#52796F] rounded-full soundwave-bar-1" />
                <span className="w-0.5 h-full bg-[#52796F] rounded-full soundwave-bar-2" />
                <span className="w-0.5 h-full bg-[#52796F] rounded-full soundwave-bar-3" />
              </div>
            </div>
          ) : (
            <span className="text-xs font-bold text-[#6B7280] tracking-tighter select-none">
              ❚❚
            </span>
          )}

          {/* Tooltip informativa da música oficial */}
          <span className="absolute right-14 whitespace-nowrap bg-[#2C302E] text-white text-[11px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg font-sans flex items-center gap-1.5">
            <span className="font-semibold text-[#C5A880]">{isPlaying ? 'Pausar:' : 'Tocar:'}</span>
            <span>Dan + Shay — From The Ground Up</span>
          </span>
        </button>
      </div>
    </>
  );
}
