"use client";

import { useEffect, useRef, useState } from "react";

interface OnboardingProps {
  open: boolean;
  onDismiss: () => void;
}

function StepIcon({ variant }: { variant: "add" | "upload" | "view" }) {
  if (variant === "add") {
    return (
      <svg viewBox="0 0 64 64" className="h-20 w-20" aria-hidden>
        <rect x="8" y="16" width="44" height="34" rx="6" fill="#f7c9ae" />
        <circle cx="22" cy="30" r="5" fill="#fffaf4" />
        <path
          d="M10 44l12-12 8 8 10-14 12 18"
          fill="none"
          stroke="#e9785d"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="48" cy="14" r="9" fill="#e9785d" />
        <path
          d="M48 10v8M44 14h8"
          stroke="#fffaf4"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (variant === "upload") {
    return (
      <svg viewBox="0 0 64 64" className="h-20 w-20" aria-hidden>
        <rect x="8" y="34" width="48" height="20" rx="6" fill="#f8df8c" />
        <path
          d="M32 10v26M22 26l10-10 10 10"
          fill="none"
          stroke="#e9785d"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20" aria-hidden>
      <rect x="8" y="10" width="20" height="20" rx="4" fill="#f7c9ae" />
      <rect x="36" y="10" width="20" height="20" rx="4" fill="#f8df8c" />
      <rect x="8" y="36" width="20" height="20" rx="4" fill="#f8df8c" />
      <rect x="36" y="36" width="20" height="20" rx="4" fill="#f7c9ae" />
      <path d="M32 46c-4-4-9-4-9 1s9 9 9 9 9-4 9-9-5-5-9-1z" fill="#e9785d" />
    </svg>
  );
}

const steps = [
  {
    variant: "add" as const,
    title: "Choose your photos",
    description:
      'Tap the "Add your photos" button at the bottom of the screen.',
    detail:
      "Choose photos already on your phone, or take a new one right here.",
  },
  {
    variant: "upload" as const,
    title: "Send them to the gallery",
    description: "Pick the moments you want to share, then let them upload.",
    detail: "Keep this page open until the upload is complete.",
  },
  {
    variant: "view" as const,
    title: "Enjoy the memories",
    description: "Everyone's photos appear together in the shared gallery.",
    detail: "Tap a photo to see it full-screen or save it to your phone.",
  },
];

export function Onboarding({ open, onDismiss }: OnboardingProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [reachedEnd, setReachedEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = stepRefs.current.findIndex((el) => el === entry.target);
            if (idx !== -1) setActiveStep(idx);
          }
        }
      },
      { root: container, threshold: 0.6 },
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));

    function onScroll() {
      if (!container) return;
      const atEnd =
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 8;
      if (atEnd) setReachedEnd(true);
    }
    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", onScroll);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      setActiveStep(0);
      setReachedEnd(false);
    }
    // Prevent the page behind the full-screen modal from scrolling.
    if (open) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [open]);

  if (!open) return null;

  function scrollToStep(index: number) {
    stepRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex animate-fade-in flex-col bg-paper"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div className="px-6 pb-2 pt-[max(2rem,env(safe-area-inset-top))]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-coral">
          Welcome to the party
        </p>
        <h1
          id="onboarding-title"
          className="mt-2 font-display text-4xl leading-[0.98] text-ink sm:text-5xl"
        >
          How to add to the book
        </h1>
        <p className="mt-3 text-[14px] text-muted">
          Scroll down to see how it works.
        </p>
      </div>

      {/* Scroll-snapped step list — fills the remaining screen height. */}
      <div
        ref={scrollRef}
        className="mx-6 mt-4 min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto rounded-2xl border border-line bg-white/50"
      >
        {steps.map((step, index) => (
          <div
            key={step.title}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            className="flex h-full min-h-full snap-start flex-col items-center justify-center px-8 py-10 text-center"
          >
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full bg-peach text-sm font-bold text-ink"
              aria-hidden
            >
              {index + 1}
            </span>
            <div className="mt-5">
              <StepIcon variant={step.variant} />
            </div>
            <h2 className="mt-5 font-display text-3xl leading-none text-ink">
              {step.title}
            </h2>
            <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-ink/80">
              {step.description}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
              {step.detail}
            </p>
          </div>
        ))}
      </div>

      <div
        className="flex items-center justify-center gap-1.5 pt-4"
        aria-label={`Step ${activeStep + 1} of ${steps.length}`}
      >
        {steps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToStep(index)}
            aria-label={`Go to step ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${index === activeStep ? "w-5 bg-coral" : "w-1.5 bg-line"}`}
          />
        ))}
      </div>

      <div className="p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={onDismiss}
          disabled={!reachedEnd}
          className="w-full rounded-2xl bg-coral py-4 text-[15px] font-bold text-white shadow-[0_8px_20px_rgba(233,120,93,0.28)] transition-colors duration-150 active:bg-coral/80 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {reachedEnd ? "Start sharing" : "Scroll to continue"}
        </button>
      </div>
    </div>
  );
}
