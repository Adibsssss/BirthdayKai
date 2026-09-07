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
      className="mb-2 block w-full break-inside-avoid overflow-hidden rounded-sm border border-line bg-line/40 sm:mb-3"
      style={{ aspectRatio: ratio }}
      aria-label="Open photo"
    >
      <img
        src={`/api/image/${photo.id}?variant=thumb`}
        alt=""
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-150 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </button>
  );
}
