'use client';

interface OnboardingProps {
  open: boolean;
  onDismiss: () => void;
}

export function Onboarding({ open, onDismiss }: OnboardingProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in items-end justify-center bg-black/40 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="w-full max-w-sm animate-slide-up rounded-t-2xl border border-line bg-paper p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:rounded-2xl sm:pb-6">
        <h1 id="onboarding-title" className="text-xl font-semibold text-ink">
          Share today&rsquo;s photos
        </h1>

        <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/80">
          <li className="flex gap-3">
            <span aria-hidden className="mt-[9px] h-1 w-1 flex-none rounded-full bg-ink" />
            <span>Add photos from your camera roll, or take a new one right here.</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-[9px] h-1 w-1 flex-none rounded-full bg-ink" />
            <span>Everyone&rsquo;s photos land in one shared gallery, updating live.</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-[9px] h-1 w-1 flex-none rounded-full bg-ink" />
            <span>Tap any photo to view it full-screen or save it to your phone.</span>
          </li>
        </ul>

        <button
          type="button"
          onClick={onDismiss}
          className="mt-7 w-full rounded-full bg-ink py-3.5 text-[15px] font-medium text-paper transition-colors duration-150 active:bg-ink/80"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
