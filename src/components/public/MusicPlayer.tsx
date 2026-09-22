'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicPlayerProps {
  src?: string;
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({
  src = '/music/casamento.mp3',
  autoPlayTrigger = false,
}: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (autoPlayTrigger && !hasInteracted && audioRef.current) {
      setHasInteracted(true);
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.log('Audio autoplay prevented:', err);
          setIsPlaying(false);
        });
    }
  }, [autoPlayTrigger, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
        })
        .catch((err) => console.log('Audio error:', err));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />

      {/* Botão flutuante discreto no canto inferior direito */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          id="btn-music-toggle"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/90 hover:bg-white text-[#2C302E] shadow-lg border border-[#C5A880]/40 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
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

          {/* Tooltip no hover */}
          <span className="absolute right-14 whitespace-nowrap bg-[#2C302E] text-white text-[11px] px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md font-sans">
            {isPlaying ? 'Pausar música' : 'Tocar música'}
          </span>
        </button>
      </div>
    </>
  );
}
