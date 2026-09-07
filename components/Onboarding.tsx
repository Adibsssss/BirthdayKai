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
      <div className="w-full max-w-sm animate-slide-up rounded-t-[2rem] border border-white/70 bg-paper p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl sm:rounded-[2rem] sm:pb-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral">Welcome to the party</p>
        <h1 id="onboarding-title" className="mt-2 font-display text-3xl leading-none text-ink">
          Add to Kai&apos;s birthday book
        </h1>

        <ul className="mt-5 space-y-4 text-[15px] leading-relaxed text-ink/80">
          <li className="flex gap-3">
            <span aria-hidden className="mt-[6px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-peach text-[11px]">1</span>
            <span>Add photos from your camera roll, or take a new one right here.</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-[6px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-butter text-[11px]">2</span>
            <span>Everyone&rsquo;s photos land in one shared gallery, updating live.</span>
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-[6px] flex h-5 w-5 flex-none items-center justify-center rounded-full bg-sage text-[11px]">3</span>
            <span>Tap any photo to view it full-screen or save it to your phone.</span>
          </li>
        </ul>

        <button
          type="button"
          onClick={onDismiss}
          className="mt-7 w-full rounded-2xl bg-coral py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(233,120,93,0.28)] transition-colors duration-150 active:bg-coral/80"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
