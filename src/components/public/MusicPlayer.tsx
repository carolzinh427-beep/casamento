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

function extractYouTubeId(url?: string): string | null {
  if (!url) return null;
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regExp);
  if (match && match[1]) return match[1];
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
  return null;
}

export default function MusicPlayer({
  src = 'https://www.youtube.com/watch?v=ODRWKGIxB4M',
  autoPlayTrigger = false,
}: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isYtReady, setIsYtReady] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const pendingPlayRef = useRef(false);

  const youtubeId = extractYouTubeId(src);

  // Inicializa a API do YouTube IFrame quando o ID de vídeo estiver presente
  useEffect(() => {
    if (!youtubeId) return;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        ytPlayerRef.current = new window.YT.Player('youtube-audio-player', {
          height: '1',
          width: '1',
          videoId: youtubeId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: youtubeId,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
          },
          events: {
            onReady: (event: any) => {
              setIsYtReady(true);
              if (pendingPlayRef.current) {
                event.target.playVideo();
                setIsPlaying(true);
              }
            },
            onStateChange: (event: any) => {
              // YT.PlayerState.PLAYING === 1
              // YT.PlayerState.PAUSED === 2
              // YT.PlayerState.ENDED === 0
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2 || event.data === 0) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.warn('Erro ao inicializar player do YouTube:', err);
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

      if (!document.getElementById('youtube-iframe-script')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }

    return () => {
      if (ytPlayerRef.current?.destroy) {
        try {
          ytPlayerRef.current.destroy();
        } catch {
          // ignore
        }
      }
    };
  }, [youtubeId]);

  // Disparo automático quando o convidado clica em "ENTRAR ♫"
  const startPlaying = useCallback(() => {
    setHasInteracted(true);

    if (youtubeId) {
      if (ytPlayerRef.current?.playVideo) {
        try {
          ytPlayerRef.current.playVideo();
          setIsPlaying(true);
        } catch (e) {
          console.warn('Falha no playVideo do YouTube:', e);
        }
      } else {
        pendingPlayRef.current = true;
      }
    }

    // Fallback simultâneo para o elemento <audio> caso YouTube falhe ou seja bloqueado
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          if (!youtubeId) setIsPlaying(true);
        })
        .catch(() => {
          // navegador pode exigir interação direta no elemento
        });
    }
  }, [youtubeId]);

  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted) {
      startPlaying();
    }
  }, [autoPlayTrigger, hasInteracted, startPlaying]);

  // Alterna entre Play e Pause
  const togglePlay = () => {
    if (isPlaying) {
      if (ytPlayerRef.current?.pauseVideo) {
        try {
          ytPlayerRef.current.pauseVideo();
        } catch {
          // ignore
        }
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      startPlaying();
    }
  };

  return (
    <>
      {/* Player oculto do YouTube (usado no site de referência casar.com) */}
      <div
        id="youtube-player-container"
        className="fixed -top-[1000px] -left-[1000px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div id="youtube-audio-player" />
      </div>

      {/* Fallback de áudio local HTML5 */}
      <audio ref={audioRef} src="/music/casamento.mp3" loop preload="auto" />

      {/* Botão flutuante minimalista no canto inferior direito */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="btn-music-toggle"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música dos noivos' : 'Tocar música dos noivos'}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/95 hover:bg-white text-[#2C302E] shadow-xl border border-[#C5A880]/50 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
        >
          {isPlaying ? (
            <div className="flex items-center gap-1">
              <span className="text-base text-[#52796F] font-bold select-none leading-none">♫</span>
              {/* Barrinhas animadas de som */}
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

          {/* Tooltip informativa no hover */}
          <span className="absolute right-14 whitespace-nowrap bg-[#2C302E] text-white text-[11px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg font-sans flex items-center gap-1.5">
            <span className="font-semibold">{isPlaying ? 'Pausar:' : 'Tocar:'}</span>
            <span>Dan + Shay — From The Ground Up</span>
          </span>
        </button>
      </div>
    </>
  );
}
