'use client';

import { useState } from 'react';
import type { Photo } from '@/types';
import { MasonryGrid } from './MasonryGrid';
import { PhotoCard } from './PhotoCard';
import { Lightbox } from './Lightbox';
import { EmptyState } from './EmptyState';

interface GalleryProps {
  photos: Photo[];
  status: 'loading' | 'ready' | 'error';
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}

export function Gallery({ photos, status, hasMore, loadingMore, onLoadMore }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (status === 'loading') {
    return (
      <div className="columns-2 gap-2 px-2 pt-4 sm:columns-3 sm:gap-3 sm:px-3 lg:columns-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="mb-2 aspect-square w-full animate-pulse rounded-sm bg-line/50 sm:mb-3"
          />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-[15px] text-ink">The gallery couldn&rsquo;t be loaded.</p>
        <p className="mt-1 text-[13px] text-muted">Check your connection and reopen the page.</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="pb-4 pt-4">
      <MasonryGrid>
        {photos.map((photo, index) => (
          <PhotoCard key={photo.id} photo={photo} onOpen={() => setOpenIndex(index)} />
        ))}
      </MasonryGrid>

      {hasMore && (
        <div className="mt-4 flex justify-center px-4">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loadingMore}
            className="rounded-full border border-line px-5 py-2.5 text-[13px] font-medium text-ink transition-colors duration-150 active:bg-line/40 disabled:opacity-50"
          >
            {loadingMore ? 'Loading…' : 'Load more'}
          </button>
        </div>
      )}

      {openIndex !== null && photos[openIndex] && (
        <Lightbox
          photos={photos}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}
