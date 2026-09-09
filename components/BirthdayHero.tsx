"use client";

/**
 * Replaces the old dark `celebration-hero` gradient banner. Balloon and
 * confetti colors are lifted from the supplied party-invite reference
 * (gold stripe, sky blue, magenta, red stripe, green, orange polka-dot),
 * hand-drawn as raw SVG fills the same way HowItWorks.tsx / Onboarding.tsx
 * already do their icon art.
 *
 * Layout is mobile-first and intentionally non-interactive: balloons +
 * bunting + confetti live in an absolutely-positioned, pointer-events-none
 * layer clipped to the section's rounded corners, concentrated at the top
 * edge and the two side edges so they frame the photo/headline/paragraph
 * instead of competing with them. Nothing below the paragraph — no badge,
 * no button, no icon row.
 */

export function BirthdayHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-[#eaf3fd] px-6 pb-10 pt-14 sm:px-10 sm:pt-16">
      <img
        src="/party-frame.png"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="polaroid-frame relative w-[62%] max-w-[220px] rotate-2 rounded-sm">
          <span
            aria-hidden
            className="absolute -top-2.5 left-1/2 h-4 w-11 -translate-x-1/2 -rotate-2 rounded-[1px] bg-butter/80 shadow-sm sm:-top-3 sm:h-5 sm:w-16"
          />
          <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-line/40">
            <img
              src="/hero-baby.jpg"
              alt="Kai"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <h1 className="mt-7 max-w-xs font-display text-[1.9rem] leading-[1.05] text-ink sm:max-w-md sm:text-4xl">
          A little book of blessings and birthday joy.
        </h1>

        <p className="mt-4 max-w-xs text-[13px] italic leading-relaxed text-muted sm:max-w-sm sm:text-base">
          Drop in your favorite snapshots from the day so we can hold onto every
          blessing, laugh, and candle.
        </p>
      </div>
    </section>
  );
}
