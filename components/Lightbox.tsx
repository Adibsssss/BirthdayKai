'use client';

import { useEffect, useRef, useState, type TouchEvent } from 'react';
import type { Photo } from '@/types';

interface LightboxProps {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const CLOSE_THRESHOLD_PX = 100;
const SWIPE_THRESHOLD_PX = 60;

export function Lightbox({ photos, index, onClose, onNavigate }: LightboxProps) {
  const photo = photos[index];
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'error'>('idle');

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const axis = useRef<'x' | 'y' | null>(null);

  useEffect(() => {
    setLoaded(false);
    setImageError(false);
    setSaveState('idle');
  }, [photo?.id]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight' && index < photos.length - 1) onNavigate(index + 1);
      if (event.key === 'ArrowLeft' && index > 0) onNavigate(index - 1);
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [index, photos.length, onClose, onNavigate]);

  if (!photo) return null;
  // Function declarations below are hoisted, so TypeScript can't tie their
  // body to the guard above — rebind to a plain `const` so it does.
  const currentPhoto = photo;

  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    if (!touch) return;
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    axis.current = null;
    setDragging(true);
  }

  function handleTouchMove(event: TouchEvent) {
    if (!touchStart.current) return;
    const touch = event.touches[0];
    if (!touch) return;
    const dx = touch.clientX - touchStart.current.x;
    const dy = touch.clientY - touchStart.current.y;
    if (!axis.current) {
      axis.current = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    if (axis.current === 'y' && dy > 0) {
      setDragY(dy);
    }
  }

  function handleTouchEnd(event: TouchEvent) {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    if (touch) {
      const dx = touch.clientX - touchStart.current.x;
      const dy = touch.clientY - touchStart.current.y;

      if (axis.current === 'y' && dy > CLOSE_THRESHOLD_PX) {
        onClose();
      } else if (axis.current === 'x') {
        if (dx < -SWIPE_THRESHOLD_PX && index < photos.length - 1) onNavigate(index + 1);
        else if (dx > SWIPE_THRESHOLD_PX && index > 0) onNavigate(index - 1);
      }
    }

    setDragY(0);
    setDragging(false);
    touchStart.current = null;
    axis.current = null;
  }

  async function handleSave() {
    setSaveState('saving');
    try {
      const res = await fetch(`/api/download/${currentPhoto.id}`);
      if (!res.ok) throw new Error('download failed');
      const blob = await res.blob();
      const fileName = currentPhoto.name || 'photo.jpg';

      // iOS Safari doesn't reliably honor the `download` attribute or a
      // programmatic anchor click for images — the native share sheet
      // (with its own "Save Image" action) is the reliable path there.
      if (typeof navigator !== 'undefined' && navigator.canShare) {
        const shareFile = new File([blob], fileName, { type: blob.type || currentPhoto.mimeType });
        if (navigator.canShare({ files: [shareFile] })) {
          await navigator.share({ files: [shareFile] });
          setSaveState('idle');
          return;
        }
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
      setSaveState('idle');
    } catch (err) {
      // Dismissing the native share sheet also rejects as an AbortError —
      // that's the user changing their mind, not a failure.
      if (err instanceof DOMException && err.name === 'AbortError') {
        setSaveState('idle');
        return;
      }
      setSaveState('error');
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black"
      style={{ opacity: dragging ? Math.max(1 - dragY / 400, 0.5) : 1 }}
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
    >
      <div className="flex items-center justify-between px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <span className="text-[13px] text-white/70">
          {index + 1} / {photos.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white active:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3.5 3.5l11 11M14.5 3.5l-11 11" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${dragY}px)` }}
      >
        {!loaded && !imageError && (
          <div
            aria-hidden
            className="absolute h-8 w-8 animate-pulse rounded-full border-2 border-white/30 border-t-white/70"
          />
        )}

        {imageError ? (
          <p className="px-8 text-center text-[14px] text-white/70">This photo couldn&rsquo;t be loaded.</p>
        ) : (
          <img
            key={photo.id}
            src={`/api/image/${photo.id}?variant=large`}
            alt=""
            onLoad={() => setLoaded(true)}
            onError={() => setImageError(true)}
            draggable={false}
            className={`max-h-full max-w-full select-none object-contain transition-opacity duration-150 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-2 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saveState === 'saving'}
          className="rounded-full bg-white px-6 py-3 text-[14px] font-medium text-ink active:bg-white/90 disabled:opacity-70"
        >
          {saveState === 'saving' ? 'Saving…' : 'Save photo'}
        </button>
        {saveState === 'error' && (
          <p className="text-[12px] text-white/70">Couldn&rsquo;t save that photo. Try again.</p>
        )}
      </div>
    </div>
  );
}
