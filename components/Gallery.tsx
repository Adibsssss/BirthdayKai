"use client";

import { useState } from "react";
import type { Photo } from "@/types";
import { MasonryGrid } from "./MasonryGrid";
import { PhotoCard } from "./PhotoCard";
import { Lightbox } from "./Lightbox";
import { EmptyState } from "./EmptyState";

interface GalleryProps {
  photos: Photo[];
  status: "loading" | "ready" | "error";
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}

// Varied heights so the loading state already reads as a masonry grid
// rather than a flat block of identical squares.
const SKELETON_HEIGHTS = [210, 280, 170, 240, 200, 260, 190, 230];

export function Gallery({
  photos,
  status,
  hasMore,
  loadingMore,
  onLoadMore,
}: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (status === "loading") {
    return (
      <div className="columns-2 gap-2 px-2 pt-4 sm:columns-3 sm:gap-3 sm:px-3 lg:columns-4">
        {SKELETON_HEIGHTS.map((height, i) => (
          <div
            key={i}
            className="mb-2 w-full animate-shimmer rounded-2xl bg-line/40 bg-[length:200%_100%] bg-gradient-to-r from-line/30 via-white/70 to-line/30 sm:mb-3"
            style={{ height }}
          />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="px-6 py-20 text-center">
        <p className="text-[15px] text-ink">
          The gallery couldn&rsquo;t be loaded.
        </p>
        <p className="mt-1 text-[13px] text-muted">
          Check your connection and reopen the page.
        </p>
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
          <PhotoCard
            key={photo.id}
            photo={photo}
            onOpen={() => setOpenIndex(index)}
          />
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
            {loadingMore ? "Loading…" : "Load more"}
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
