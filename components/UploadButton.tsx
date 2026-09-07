"use client";

import { useRef, useState, type ChangeEvent } from "react";

interface UploadButtonProps {
  onFilesSelected: (files: FileList) => void;
}

export function UploadButton({ onFilesSelected }: UploadButtonProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const libraryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
    event.target.value = "";
    setMenuOpen(false);
  }

  return (
    <>
      {menuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 animate-fade-in bg-black/20"
        />
      )}

      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <div className="flex w-full max-w-md flex-col items-stretch gap-2">
          {menuOpen && (
            <div className="glass-surface animate-slide-up overflow-hidden rounded-2xl">
              <button
                type="button"
                onClick={() => libraryInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 border-b border-line/60 py-4 text-[15px] font-medium text-ink active:bg-peach/30"
              >
                <span aria-hidden>▧</span> Choose from library
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="flex w-full items-center justify-center gap-2 py-4 text-[15px] font-medium text-ink active:bg-peach/30"
              >
                <span aria-hidden>◉</span> Take a photo
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="glass-pill w-full rounded-2xl py-4 text-[15px] font-bold text-ink transition duration-150 active:scale-[0.98]"
          >
            {menuOpen ? "Close" : "+ Add your photos"}
          </button>
        </div>
      </div>

      <input
        ref={libraryInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}
