import type { ReactNode } from 'react';

interface MasonryGridProps {
  children: ReactNode;
}

/**
 * A CSS multi-column masonry layout. Deliberately not a JS-measured grid:
 * each child reserves its own height up front via `aspect-ratio` (using
 * the width/height Drive already extracted from the file), so the browser
 * never has to reflow once an image finishes loading. Columns fill
 * top-to-bottom before moving to the next column, so the newest photos
 * cluster near the top rather than in strict left-to-right rows — a
 * common, acceptable trade-off for CSS-only masonry.
 */
export function MasonryGrid({ children }: MasonryGridProps) {
  return <div className="columns-2 gap-2 px-2 sm:columns-3 sm:gap-3 sm:px-3 lg:columns-4">{children}</div>;
}
