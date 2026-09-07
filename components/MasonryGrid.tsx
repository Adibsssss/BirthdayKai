import type { ReactNode } from "react";

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
 *
 * Extra top padding and wider gaps than a plain thumbnail grid would need
 * give each tilted PhotoCard room for its pin/tape accent to overhang the
 * frame without clipping against a neighboring column or the grid edge.
 */
export function MasonryGrid({ children }: MasonryGridProps) {
  return (
    <div className="corkboard-texture columns-2 gap-4 rounded-[1.75rem] px-3 pb-2 pt-4 sm:columns-3 sm:gap-5 sm:px-4 lg:columns-4">
      {children}
    </div>
  );
}
