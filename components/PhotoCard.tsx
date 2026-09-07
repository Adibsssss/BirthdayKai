'use client';

import { useState } from 'react';
import type { Photo } from '@/types';

interface PhotoCardProps {
  photo: Photo;
  onOpen: () => void;
}

export function PhotoCard({ photo, onOpen }: PhotoCardProps) {
  const [loaded, setLoaded] = useState(false);
  const ratio = photo.width && photo.height ? photo.width / photo.height : 1;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/70 bg-line/40 shadow-[0_7px_18px_rgba(91,57,42,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_28px_rgba(91,57,42,0.17)] sm:mb-4"
      style={{ aspectRatio: ratio }}
      aria-label="Open photo"
    >
      <img
        src={`/api/image/${photo.id}?variant=thumb`}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition duration-500 group-hover:scale-[1.035] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  );
}
