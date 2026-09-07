'use client';

import { useState } from 'react';

interface OnboardingProps {
  open: boolean;
  onDismiss: () => void;
}

export function Onboarding({ open, onDismiss }: OnboardingProps) {
  const [step, setStep] = useState(0);

  if (!open) return null;

  const steps = [
    {
      title: 'Choose your photos',
      description: 'Tap the Add your photos button at the bottom of the screen.',
      detail: 'Choose photos already on your phone, or take a new one right here.',
    },
    {
      title: 'Send them to the gallery',
      description: 'Pick the moments you want to share, then let them upload.',
      detail: 'Keep this page open until the upload is complete.',
    },
    {
      title: 'Enjoy the memories',
      description: 'Everyone\'s photos appear together in the shared gallery.',
      detail: 'Tap a photo to see it full-screen or save it to your phone.',
    },
  ];
  const currentStep = steps[step]!;
  const isLastStep = step === steps.length - 1;

  function next() {
    if (isLastStep) {
      onDismiss();
      return;
    }

    setStep((current) => current + 1);
  }

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
          How to add to Kai&apos;s birthday book
        </h1>

        <div className="mt-6 rounded-2xl border border-line bg-white/50 p-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-peach text-sm font-bold text-ink" aria-hidden>
            {step + 1}
          </span>
          <h2 className="mt-4 font-display text-2xl leading-none text-ink">{currentStep.title}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{currentStep.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{currentStep.detail}</p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => setStep((current) => current - 1)}
              className="rounded-2xl border border-line px-4 py-4 text-[15px] font-bold text-ink active:bg-peach/30"
            >
              Back
            </button>
          ) : (
            <span className="w-[70px]" aria-hidden />
          )}
          <div className="flex flex-1 justify-center gap-1.5" aria-label={`Step ${step + 1} of ${steps.length}`}>
            {steps.map((_, index) => (
              <span
                key={index}
                className={`h-1.5 rounded-full transition-all ${index === step ? 'w-5 bg-coral' : 'w-1.5 bg-line'}`}
                aria-hidden
              />
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            className="min-w-[112px] rounded-2xl bg-coral px-5 py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(233,120,93,0.28)] transition-colors duration-150 active:bg-coral/80"
          >
            {isLastStep ? 'Start sharing' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
